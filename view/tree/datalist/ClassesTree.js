/*
 collectRowObjects does the following

 1) collectComponentRowObjects
 collectComponentRowObjects : collect a list of all the components in the app

 2) collectClassRowObjects( componentRowObjects )
 for each component, add the associated TemplateClass.
 For each template class, work up its superclass chain, to have addNewRowObject4Superclass
 add the superclass to classRowObjects
 noting along the way the associated subclasses ( addSubclassToClassRowObject )
 What you get is:
 { value: <class>, subclassRowObjects: [...], instanceRowObjects: [cmpnntRowObjects], text: <string> }

 4) addRowObjects
 Starting with Component, working thru the descendants of each class,
 build a new, sorted array of final row records.
 We store this array in this.rowObjects for collectRowObjects to return.
 */

Ext.define( 'uxExtSpect.view.tree.datalist.ClassesTree',
	{  extend: 'uxExtSpect.view.tree.datalist.BranchStateTree',
		xtype: 'classestree',

		parentOf: function ( object ) {
			return object.superclass;
		},

		isContainerOrClass: function ( object ) {
			return this.isClass( object );
		},

		objectSubparts: function ( object ) {
			return ( object.extspectSubclasses || [] );
		},

		// if the tree does not allow instances, rowObject.instanceRowObjects is empty
		showableChildren: function ( rowObject ) {
			return ( rowObject.subclassRowObjects || [] ).concat( rowObject.instanceRowObjects ||
				[] );
		},

		createRowObject: function ( object ) { return { value: object }; },

		collectRowObjects: function () {
			var componentRowObjects = this.collectComponentRowObjects(); // @ TreeList

			if ( componentRowObjects.length > 0 ) {
				this.collectClassRowObjects( componentRowObjects );
				this.rowObjects = [];
				this.addRowObjects( this.baseClassRowObject );
			}
			else { this.rowObjects = []; }
			return this.rowObjects;
		},

		// Collect all the components from ComponentManager
		collectComponentRowObjects: function () {
			var mapObject = Ext.ComponentManager.map;
			var rowObjects = [];
			var index = 0;
			for ( var property in mapObject ) {
				rowObjects[index ++] = this.createRowObject( mapObject[property] );
			}
			return rowObjects;
		},

		// Build an array of class rowObjects
		// { value: <class>, subclassRowObjects: [...], instanceRowObjects: [cmpnntRowObjects], text: <string> }
		collectClassRowObjects: function ( componentRowObjects ) {
			var classRowObjects = []; // a temporary array of the rowObjects for each class encountered
			var classRowObject, componentRowObject, component;
			var showInstancesOk = this.fetchParentNavigationView().showInstances;

			for ( var len = componentRowObjects.length , index = 0; index < len; index ++ ) {
				componentRowObject = componentRowObjects[ index ];
				component = componentRowObject.value;
				var templateClass = component.self.prototype;

				var pos = this.findItemPos( templateClass, "value", classRowObjects );
				var classIsClosed = this.isClosed( templateClass );
				if ( pos === - 1 ) {
					classRowObject = this.createRowObject( templateClass );
					classRowObjects.push( classRowObject );
					if ( showInstancesOk ) {
						classRowObject.instanceRowObjects =
							classIsClosed ? [] : [componentRowObject];
					}
					templateClass.extspectSubclasses = [];
				}
				else {
					classRowObject = classRowObjects[ pos ];
					if ( showInstancesOk && ! classIsClosed ) {
						classRowObject.instanceRowObjects.push( componentRowObject );
					}
				}

				var superClass = templateClass.superclass;
				if ( superClass ) {
					this.processSuperclass( superClass, templateClass, classRowObject, classRowObjects );
				}
			}
		},

		// create a classRowObject for superclass if none exists
		// if one exists, add subclass to superlclass.subclasses
		processSuperclass: function ( superclass, subclass, subclassRowObject, classRowObjects ) {
//			console.group( 'processSuperclass', superclass.$className, subclass.$className );
			if ( superclass ) {
				var pos = this.findItemPos( superclass, "value", classRowObjects );

				if ( pos === - 1 ) {
					this.addRowObject4NewSuperclass( superclass, subclass, subclassRowObject, classRowObjects );
				}
				else {
					var superclassRowObject = classRowObjects[ pos ];
					this.addSubclassToClassRowObject( subclass, subclassRowObject, superclass, superclassRowObject );
				}
			}
//			console.groupEnd( 'processSuperclass', superclass.$className, superclass.expectSubclasses );
		},

		addRowObject4NewSuperclass: function ( newSuperclass, subclass, subclassRowObject, classRowObjects ) {
			var newRowObject = this.createRowObject( newSuperclass );

			newRowObject.instanceRowObjects = []
			newRowObject.subclassRowObjects = [subclassRowObject];
			newSuperclass.extspectSubclasses = new Array( subclass );
//			console.log( 'addRowObject4NewSuperclass', newSuperclass.$className, subclass.$className );
//			console.log( 'addRowObject4NewSuperclass', newSuperclass.$className, newSuperclass.extspectSubclasses.extspectString() );

			classRowObjects.push( newRowObject );

			if ( newSuperclass.$className === 'Ext.Component' ) {
				this.baseClassRowObject = newRowObject;
			}

			var superSuperClass = newSuperclass.superclass;
			if ( superSuperClass ) {
				this.processSuperclass( superSuperClass, newSuperclass, newRowObject, classRowObjects );
			}
		},

		addSubclassToClassRowObject: function ( subclass, subclassRowObject, superclass, superclassRowObject ) {
			if ( ! superclassRowObject.subclassRowObjects ) {
				superclassRowObject.subclassRowObjects = [];
			}
			var subclassRowObjects = superclassRowObject.subclassRowObjects;
			if ( subclassRowObjects.indexOf( subclassRowObject ) === - 1 ) {
				subclassRowObjects.push( subclassRowObject );
			}

			if ( ! superclass.extspectSubclasses ) {
				superclass.extspectSubclasses = [];
			}
//			console.log( 'addSubclassToClassRowObject', superclass.$className, subclass.$className );
			//var subclasses = superclass.extspectSubclasses;
			if ( superclass.extspectSubclasses.indexOf( subclass ) === - 1 ) {
				superclass.extspectSubclasses.push( subclass );
			}
//			console.log( 'addSubclassToClassRowObject', superclass.$className,
//				superclass.extspectSubclasses.extspectString() );
		},

		// addRowObjects
		// Starting with this.baseClassRowObject, which is Ext.Component
		//	work through the class objects, building a new array of the row objects,
		//	ordered top to bottom according to their position in the hierarchy.
		//	At the end, a RowObject looks like this:
		//	{ text : string , value : templateClassObject }
		//	We store this array in this.rowObjects for collectRowObjects to return

		addRowObject: function ( rowObject ) {
			// console.log( arguments.callee.displayName, rowObject.$className );
			rowObject.text = this.rowStringOf( rowObject.value );
			this.rowObjects.push( rowObject );
		},

		addRowObjectsForObjectAndChildren: function ( rowObject ) {
			// console.log( arguments.callee.displayName, rowObject.$className );
			this.addRowObject( rowObject );
			var object = rowObject.value;
			if ( this.isContainerOrClass( object ) && ! this.isClosed( object ) ) {
				this.addChildRowObjects( rowObject );
			}
			//	debugger;
		},

		setBranchState: function ( object, string ) {
			if ( this.isClass( object ) ) {
				this.callParent( arguments );
			}
		},

		// in an array of objects, return the index of the first object that has value in property
		findItemPos: function ( value, property, array ) {
			for ( var len = array.length , index = 0; index < len; index ++ ) {
				if ( array[ index ][ property ] === value ) { return index; }
			}
			return - 1;
		}
	}
);
