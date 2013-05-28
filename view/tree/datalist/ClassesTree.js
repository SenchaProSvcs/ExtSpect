/*

 1) collectRowObjects
 collect a list of the components in the app

 2) addTemplateClasses
 add for each component the associated TemplateClass
 and add a new record for each super TemplateClass ( addNewRowObject4Superclass )
 noting the associated subclasses ( addSubclassToClassRowObject )

 4) buildFinalRowObjects
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
				// console.log( arguments.callee.displayName, index, property );
				rowObjects[index ++] = this.createRowObject( mapObject[property] );
			}
			// console.log( arguments.callee.displayName, index, rowObjects );
			return rowObjects;
		},

		collectRowObjects: function () {
			var componentRowObjects = this.collectComponentRowObjects(); // @ TreeList

			if ( componentRowObjects.length > 0 ) {
				this.collectClassRowObjects( componentRowObjects );
				this.rowObjects = [];
				this.buildFinalRowObjects( this.baseClassRowObject );
			}
			else { this.rowObjects = []; }
			// console.log( arguments.callee.displayName, componentRowObjects.length, this.rowObjects.length );
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

			var superClass = newTemplateClass.superclass;
			if ( superClass ) {
				this.processSuperclass( superClass, newRowObject, classRowObjects );
			}
			else {
				if ( newTemplateClass.$className === 'Ext.Base' ) {
					this.baseClassRowObject = newRowObject;
				}
			}
		},

		// buildFinalRowObjects
		// Starting with Ext.Base
		//	work through the class records, building a new array of the row objects,
		//	ordered top to bottom according to their position in the hierarchy.
		//	The finalRowObject produced by createFinalRowObject looks like this:
		//	{ text : string , value : templateClassObject }
		//	We store this array in this.rowObjects for collectRowObjects to return

		buildFinalRowObject2: function ( classRowObject ) {
			classRowObject.text = this.computeRowObjectString( classRowObject.value );
			this.rowObjects.push( classRowObject );
			if ( ! this.fetchIsClosed( classRowObject.value ) ) {
				var array =
					( classRowObject.subclassRowObjects ||
						[] ).concat( classRowObject.instanceRowObjects || [] );
				this.addNewRowObjects( array );
			}
		},

		// in an array of objects, return the index of the first object that has value in property
		findItemPos: function ( value, property, array ) {
			for ( var len = array.length , index = 0; index < len; index ++ ) {
				if ( array[ index ][ property ] === value ) { return index; }
			}
			return - 1;
		},

		valueString2: function ( object, objectString ) {
			if ( object.hasOwnProperty( "$className" ) ) {
				return this.callParent( arguments );
			}
			else { return objectString; }
		}
	}
);
