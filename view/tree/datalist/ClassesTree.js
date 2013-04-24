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

 TODO: We could also build a tree of constructors, only Ext does not chain them
 */

Ext.define( 'ux.extspect.view.tree.datalist.ClassesTree',
	{  extend : 'ux.extspect.view.tree.datalist.TreeList',
		xtype : 'classestree',

		createComponentRowObject : function ( component ) { return { object : component }; },

		collectRowObjects : function () {
			var componentRecs = this.collectComponentRowObjects(); // @ TreeList

			if ( componentRecs.length > 0 ) {
				this.collectClassRowObjects( componentRecs );
				this.rowObjects = [];
				this.buildFinalRowObjects( this.baseClassRec );
			}
			else { this.rowObjects = []; }
			return this.rowObjects;
		},

		collectClassRowObjects : function ( componentRecs ) {
			var classRecs = [];
			var classRec , instanceRec , instance;
			var showInstancesOk = this.fetchParentNavigationView().showInstances;

			for ( var len = componentRecs.length , index = 0; index < len; index++ ) {
				instanceRec = componentRecs[ index ];
				instance = instanceRec.object;
				var templateClass = instance.self.prototype;

				var pos = this.findItemPos( templateClass, "object", classRecs );
				if ( pos === -1 ) {
					classRec = { object : templateClass };
					classRecs.push( classRec );;
					if ( showInstancesOk )
					{ classRec.instanceRecs = [instanceRec]; }
				}
				else {
					classRec = classRecs[ pos ];
					if ( showInstancesOk )
					{ classRec.instanceRecs.push( instanceRec ); }
				}

				var superClass = templateClass.superclass;
				if ( superClass )
				{ this.processSuperClass( superClass, classRec, classRecs ); }
			}
			return classRecs;
		},

		processSuperClass : function ( superClass, classRec, classRecs ) {
			if ( superClass )
			{
				var pos = this.findItemPos( superClass, "object", classRecs );
				if ( pos === -1 )
				{ this.addNewRowObject4SuperClass( superClass, classRec, classRecs ); }
				else {
					var superClassRec = classRecs[ pos ];
					this.addSubClassToClassRowObject( classRec, superClassRec );
				}
			}
		},

		addSubClassToClassRowObject : function ( classRec, superClassRec ) {
			if ( !superClassRec.subClassRecs ) { superClassRec.subClassRecs = []; }
			var subClassRecs = superClassRec.subClassRecs;
			if ( subClassRecs.indexOf( classRec ) === -1 )
			{ subClassRecs.push( classRec ); }
		},

		addNewRowObject4SuperClass : function ( newTemplateClass, subClassRec, classRecs ) {
			var newRec = { object : newTemplateClass, subClassRecs : [subClassRec], instanceRecs : [] };
			classRecs.push( newRec );

			var superClass = newTemplateClass.superclass;
			if ( superClass )
			{ this.processSuperClass( superClass, newRec, classRecs ); }
			else {
				if ( newTemplateClass.$className === 'Ext.Base' )
				{  this.baseClassRec = newRec; }
			}
		},

		// buildFinalRowObjects
		// Starting with Ext.Base
		//	work through the class records, building a new array of the row
		//	records, ordered top to bottom according to their position in the hierarchy.
		//	The record produced by createRowObject looks like this:
		//	{ text : string , value : templateClassObject }
		//	We store this array in this.rowObjects for collectRowObjects to return

		buildFinalRowObject2 : function ( classRec, index, forEachArray ) {
			this.rowObjects.push( this.createRowObject( classRec ) );
			var array = ( classRec.subClassRecs || [] ).concat( classRec.instanceRecs || [] );
			this.addNewRowObjects( array );
		},

		// in an array of objects, return the index of the first object that has value in property
		findItemPos : function ( value, property, array ) {
			for ( var len = array.length , index = 0; index < len; index++ )
			{  if ( array[ index ][ property ] === value ) { return index; }
			}
			return -1;
		},

		computeObjectString : function ( object ) {
			if ( object.hasOwnProperty( "$className" ) )
			{ return this.callParent( arguments ); }
			else { return ux.extspect.util.StringOf.to$( object ); }
		}
	}
);
