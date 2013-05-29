/*
 1) collectRowObjects
 collect a list of the components in the app

 2) addTemplateClasses
 for each component, add the associated TemplateClass
 and add a new record for each super TemplateClass ( addNewRowObject4Superclass )
 noting the associated subclasses ( addSubclassToClassRowObject )

 4) addRowObjects
 build a new, sorted array of final row records.
 We store this array in this.rowObjects for collectRowObjects to return.
 */

Ext.define( 'uxExtSpect.view.tree.datalist.ClassesTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',
		xtype: 'classestree',

		createRowObject: function ( object ) { return { value: object }; },

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

		collectClassRowObjects: function ( componentRowObjects ) {
			var classRowObjects = [];
			var classRowObject, componentRowObject, component;
			var showInstancesOk = this.fetchParentNavigationView().showInstances;

			for ( var len = componentRowObjects.length , index = 0; index < len; index ++ ) {
				componentRowObject = componentRowObjects[ index ];
				component = componentRowObject.value;
				var templateClass = component.self.prototype;

				var pos = this.findItemPos( templateClass, "value", classRowObjects );
				var classIsClosed = this.fetchIsClosed( templateClass );
				if ( pos === - 1 ) {
					classRowObject = this.createRowObject( templateClass );
					classRowObjects.push( classRowObject );
					if ( showInstancesOk ) {
						classRowObject.instanceRowObjects =
							classIsClosed ? [] : [componentRowObject];
					}
				}
				else {
					classRowObject = classRowObjects[ pos ];
					if ( showInstancesOk && ! classIsClosed ) {
						classRowObject.instanceRowObjects.push( componentRowObject );
					}
				}

				var superClass = templateClass.superclass;
				if ( superClass ) {
					this.processSuperclass( superClass, classRowObject, classRowObjects );
				}
			}
			return classRowObjects;
		},

		processSuperclass: function ( superclass, classRowObject, classRowObjects ) {
			if ( superclass ) {
				var pos = this.findItemPos( superclass, "value", classRowObjects );

				if ( pos === - 1 ) {
					this.addNewRowObject4Superclass( superclass, classRowObject, classRowObjects );
				}
				else {
					var superclassRowObject = classRowObjects[ pos ];
					this.addSubclassToClassRowObject( classRowObject, superclassRowObject );
				}
			}
		},

		addSubclassToClassRowObject: function ( classRowObject, superclassRowObject ) {
			if ( ! superclassRowObject.subclassRowObjects ) {
				superclassRowObject.subclassRowObjects = [];
			}
			var subclassRowObjects = superclassRowObject.subclassRowObjects;
			if ( subclassRowObjects.indexOf( classRowObject ) === - 1 ) {
				subclassRowObjects.push( classRowObject );
			}
		},

		addNewRowObject4Superclass: function ( newTemplateClass, subclassRowObject, classRowObjects ) {
			var newRowObject = this.createRowObject( newTemplateClass );
			newRowObject.subclassRowObjects = [subclassRowObject];
			newRowObject.instanceRowObjects = []

			classRowObjects.push( newRowObject );

			if ( newTemplateClass.$className === 'Ext.Component' ) {
				// console.log( arguments.callee.displayName, newTemplateClass.$className );
				this.baseClassRowObject = newRowObject;
			}

			var superClass = newTemplateClass.superclass;
			if ( superClass ) {
				this.processSuperclass( superClass, newRowObject, classRowObjects );
			}
		},

		// addRowObjects
		// Starting with this.baseClassRowObject which is Ext.Component
		//	work through the class records, building a new array of the row objects,
		//	ordered top to bottom according to their position in the hierarchy.
		//	At the end, a RowObject looks like this:
		//	{ text : string , value : templateClassObject }
		//	We store this array in this.rowObjects for collectRowObjects to return

		addRowObject: function ( rowObject ) {
			rowObject.text = this.computeRowObjectString( rowObject.value );
			this.rowObjects.push( rowObject );
		},

		addRowObjectsForObjectAndChildren: function ( rowObject ) {
			this.addRowObject( rowObject );
			if ( ! this.fetchIsClosed( rowObject.value ) ) {
				this.addChildRowObjects( rowObject );
			}
		},

		objectChildren: function ( rowObject ) {
			return ( rowObject.subclassRowObjects || [] ).concat( rowObject.instanceRowObjects ||
				[] );
		},

		// in an array of objects, return the index of the first object that has value in property
		findItemPos: function ( value, property, array ) {
			for ( var len = array.length , index = 0; index < len; index ++ ) {
				if ( array[ index ][ property ] === value ) { return index; }
			}
			return - 1;
		},

		spanString: function ( object, objectString ) {
			if ( object.hasOwnProperty( "$className" ) ) {
				return this.callParent( arguments );
			}
			else { return objectString; }
		},

		assignIsClosed: function ( object, bool ) {
			if ( object.hasOwnProperty( "$className" ) ) {
				this.callParent( arguments );
			}
		}
//		assignIsClosed: function ( object, bool, record ) {
//			console.log( arguments.callee.displayName, object, record );
//			var rowObject = record.raw;
//			if ( this.objectChildren( rowObject ).length > 0 ) {
//				this.callParent( arguments );
//			}
//		}
	}
);
