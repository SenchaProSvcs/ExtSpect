/* THIS INFO IS OUT OF DATE!

 1) collectRowObjects
 collect a list of the components in the app

 2) collectConstructorFunctionRecs
 collect a list of the direct constructor functions for each of those components,
 noting the instance components for each constuctor

 3) addTemplateClassRecs
 add to each constructor record the associated TemplateClass
 and add a new record for each super TemplateClass ( addNewRowObject4SuperClass )
 noting the associated subclasses ( addSubClassToClassRowObject )

 4) buildFinalRowObjects
 build a new, sorted array of row records.
 We store this array in this.rowObjects for collectRowObjects to return.
 */

Ext.define( 'uxExtSpect.view.tree.datalist.ClassesTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',
		xtype: 'classestree',

		createComponentRowObject: function ( component ) { return { object: component }; },
		//// createComponentRowObject: function ( component ) { return component },

		collectComponentRowObjects: function () {
			var mapObject = Ext.ComponentManager.map;
			var rowObjects = [];
			var index = 0;
			for ( var property in mapObject ) {
				// console.log( arguments.callee.displayName, index, property );
				rowObjects[index ++] = this.createComponentRowObject( mapObject[property] );
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
			console.log( arguments.callee.displayName, componentRowObjects.length, this.rowObjects.length );
			return this.rowObjects;
		},

		collectClassRowObjects: function ( componentRowObjects ) {
			var classRowObjects = [];
			var classRowObject, componentRowObject, component;
			var showInstancesOk = this.fetchParentNavigationView().showInstances;

			for ( var len = componentRowObjects.length , index = 0; index < len; index ++ ) {
				componentRowObject = componentRowObjects[ index ];
				component = componentRowObject.object;
				//// component = componentRowObject;
				var templateClass = component.self.prototype;

				var pos = this.findItemPos( templateClass, "object", classRowObjects );
				var classIsClosed = this.fetchIsClosed( templateClass );
				if ( pos === - 1 ) {
					classRowObject = { object: templateClass };
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
				if ( superClass ) { this.processSuperClass( superClass, classRowObject, classRowObjects ); }
			}
			return classRowObjects;
		},

		processSuperClass: function ( superClass, classRowObject, classRowObjects ) {
			if ( superClass ) {
				var pos = this.findItemPos( superClass, "object", classRowObjects );

				if ( pos === - 1 ) { this.addNewRowObject4SuperClass( superClass, classRowObject, classRowObjects ); }
				else {
					var superClassRowObject = classRowObjects[ pos ];
					this.addSubClassToClassRowObject( classRowObject, superClassRowObject );
				}
			}
		},

		addSubClassToClassRowObject: function ( classRowObject, superClassRowObject ) {
			if ( ! superClassRowObject.subClassRowObjects ) {
				superClassRowObject.subClassRowObjects = [];
			}
			var subClassRowObjects = superClassRowObject.subClassRowObjects;
			if ( subClassRowObjects.indexOf( classRowObject ) === - 1 ) {
				subClassRowObjects.push( classRowObject );
			}
		},

		addNewRowObject4SuperClass: function ( newTemplateClass, subClassRowObject, classRowObjects ) {
			var newRowObject = {
				object: newTemplateClass, subClassRowObjects: [
					subClassRowObject
				], instanceRowObjects: [] };
			classRowObjects.push( newRowObject );

			var superClass = newTemplateClass.superclass;
			if ( superClass ) { this.processSuperClass( superClass, newRowObject, classRowObjects ); }
			else {
				if ( newTemplateClass.$className === 'Ext.Base' ) { this.baseClassRowObject = newRowObject; }
			}
		},

		// buildFinalRowObjects
		// Starting with Ext.Base
		//	work through the class records, building a new array of the row
		//	records, ordered top to bottom according to their position in the hierarchy.
		//	The finalRowObject produced by createRowObject looks like this:
		//	{ text : string , value : templateClassObject }
		//	We store this array in this.rowObjects for collectRowObjects to return

		buildFinalRowObject2: function ( classRowObject ) {
			var finalRowObject = this.createRowObject( classRowObject );
			this.rowObjects.push( finalRowObject );
			var array = ( classRowObject.subClassRowObjects ||
				[] ).concat( classRowObject.instanceRowObjects || [] );
			this.addNewRowObjects( array );
		},

		// in an array of objects, return the index of the first object that has value in property
		findItemPos: function ( value, property, array ) {
			for ( var len = array.length , index = 0; index < len; index ++ ) {
				if ( array[ index ][ property ] === value ) { return index; }
			}
			return - 1;
		},

		computeObjectString: function ( object, objectString ) {
			if ( object.hasOwnProperty( "$className" ) ) {
				return this.callParent( arguments );
			}
			else { return objectString; }
		}
	}
);
