Ext.define( 'extspect.view.ExtSpectDataList',
	{  extend : 'Ext.dataview.List',
		isExtSpectDataList : true,
		defaultIdPrefix : 'es-',

		config : {    itemTpl : '{text}',
			rootObject : Ext.Viewport,
			emptyText : "NO DATA",
			listeners : {
				itemtap : function () { this.handleItemTap.apply( this, arguments ); },
				painted : function () { this.handlePainted.apply( this, arguments ); }
			}
		},

		fetchParentNavigationView : function () {
			var view = this.up( '[isExtSpectNavigationView]' );
			return view;
		},

		fetchObjectNavigationView : function () { return Ext.ComponentQuery.query( 'objectnavigationview' )[ 0 ]; },

		fetchParentTabPanel : function () {
			var panel = this.up( '[isExtSpectTabPanel]' );
			return panel;
		},

		fetchRootObject : function () {
			var tabPanel = this.fetchParentTabPanel();
			var rootObject = tabPanel.fetchRootObject();
			return rootObject;
		},

		// ========== handlePainted

		handlePainted : function () { this.computeAndSetData(); },

		computeAndSetData : function () {
			this.determineAndSetIndexBar();
			var recs = this.collectRowObjects();
			var storeName = this.determineStoreName();
			var store = Ext.create( storeName );
			store.setData( recs );
			this.setStore( store );
		},

		determineStoreName : function () {
			var storeName = this.storeName || this.fetchParentNavigationView().dataListStoreName;
			return storeName;
		},

		// isExtObject : function ( value )
		// {	return ( value instanceof Ext.Base ) || ( value && value.hasOwnProperty( "modelName" ) ) } ,

		// An instance here is defined as an object with a named constructor
		// The Instance must have at least 1 property
		// A config object is not an instance, nor is a RegEx
		isInstance : function ( value ) {
			var result =
				(    ( value instanceof Object ) &&
					( StringOf.constructorName( value ) !== '' ) &&
					( !( value instanceof RegExp ) ) &&
					( !( value instanceof HTMLElement ) ) && // many Ext.Loader.scriptElements
					( StringOf.propertyCount( Object ) > 0 )
					);
			return result;
		},

		pushItemOnArray : function ( item, index, len ) {
			this.push( item );
			return true;
		},

		extCollectionToArray : function ( collection ) {
			var array = [];
			collection.each( this.pushItemOnArray, array );
			return array;
		},
		// TODO: BUG. Ext.Array.toArray does not work
		//function extCollectionToArray( collection )
		// {	Trace.start()
		//		return Trace.end( Ext.Array.toArray( collection ) )
		//}

		htmlCollectionToArray : function ( collection ) {
			var array = [];
			for ( var len = collection.length , index = 0; index < len; index++ )
			{ array.push( collection.item( index ) ); }
			return array;
		}

	}
);
/*createComparisonFunction : function ( property )
 {	var fnctn = function ( firstObject , secondObject )
 {	var firstValue = firstObject[ property ]
 var secondValue = secondObject[ property ]
 return ( firstValue === secondValue ? 0 : ( firstValue > secondValue ) ? 1 : -1 )
 }
 return fnctn
 } ,*/

/*checkForDuplicates : function ( array )
 {	var len = array.length
 for ( var index1 = 0 ;  index1 < len ; index1 ++ )
 {	for ( var index2 = 0 ; index2 < len ; index2 ++ )
 {	if 	(	(	index1 !== index2 ) &&
 (	array[ index1 ] === array[ index2 ] )
 )
 { console.warn( 'checkForDuplicates failed' ) }
 }	}	}*/

/*
 setTabBadge : function ( )
 {	var title = this.paraent.title
 var query = '[title="' + title + '"]'
 var TabButtons = Ext.ComponentQuery.query( title )
 for ( var len = TabButtons.length , index = 0 ; index < len ; index ++ )
 {	var component = TabButtons[ index ]
 if ( "setBadgeText" in component )
 {	component.setBadgeText( "99" ) }
 }
 var tabPanel = this.up( '.'+ this.panelXtype )
 tabPanel = Ext.ComponentQuery.query( '.'+ this.panelXtype )[0]

 tabButton.setBadgeText()
 }
 */


/*
 // THIS WAS TEMPORARY, BUT USEFUL
 TraceClassRecords : function ( array )
 {	if ( Trace.ok )
 {	var len = array.length
 if ( len > 0 )
 {	for ( var index = 0 ; index < len ; index ++ )
 {	var rcrd = array[ index ]
 if ( "object" in rcrd )
 {	Trace.vars( 'index', index, 'value', rcrd.object.$className ) }
 else
 {	Trace.vars( 'index', index, 'value', rcrd ) }
 }	}
 else
 {	Trace.vars( 'array', '[]' )
 }	}	}*/
