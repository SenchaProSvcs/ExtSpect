Ext.define( 'uxExtSpect.view.ExtSpectDataList',
	{  extend: 'Ext.dataview.List',
		isExtSpectDataList: true,
		defaultIdPrefix: 'es-',

		config: {
			itemTpl: '{text}',
			rootObject: Ext.Viewport,
			emptyText: "NO DATA",

			useSimpleItems: true, // Touch 2.2.0
			// variableHeights: true, // Touch 2.2.0
			infinite: true, // Touch 2.2.0

			itemHeight: 10, // added for Touch 2.1
			// itemHeight: 16, // added for Touch 2.2
			// This becomes style="min-height:10px !important!" in the elements

			// baseCls: 'es-list-item',
			// cls: 'es-list-item',
			// itemCls:'es-list-item', // Touch 2.1

			listeners: {
				itemsingletap: function () { this.handleSingleItemTap.apply( this, arguments ); },
				itemdoubletap: function () { this.handleDoubleItemtap.apply( this, arguments ); },
				painted: function () { this.handlePainted.apply( this, arguments ); }
			}
		},

		fetchParentNavigationView: function () {
			return this.up( '[isExtSpectNavigationView]' );
		},

		fetchObjectNavigationView: function () {
			return Ext.ComponentQuery.query( 'objectnavigationview' )[ 0 ];
		},

		fetchParentTabPanel: function () {
			return this.up( '[isExtSpectTabPanel]' );
		},

		fetchRootObject: function () {
			var tabPanel = this.fetchParentTabPanel();
			var rootObject = tabPanel.fetchRootObject();
			return rootObject;
		},

		// ========== handlePainted

		handleDoubleItemtap: function () { /* Do nothing*/ },

		handlePainted: function () { this.computeAndSetData(); },

		computeAndSetData: function () {
			// console.group( arguments.callee.displayName, this.id );
			var previousStore = this.getStore();
			if ( previousStore ) { Ext.StoreManager.unregister( previousStore ); }

			this.determineAndSetIndexBar();
			var recs = this.collectRowObjects();
			var storeName = this.determineStoreName();
			var store = Ext.create( storeName );
			store.setData( recs );
			this.setStore( store );
			// console.groupEnd( arguments.callee.displayName, this.id );
		},

		determineStoreName: function () {
			var storeName = this.storeName || this.fetchParentNavigationView().dataListStoreName;
			return storeName;
		},

		// isExtObject : function ( value )
		// {	return ( value instanceof Ext.Base ) || ( value && value.hasOwnProperty( "modelName" ) ) } ,

		// An instance here is defined as an object with a named constructor
		// The Instance must have at least 1 property
		// A config object is not an instance, nor is a RegEx
		isInstance: function ( value ) {
			var result =
				(  ( value instanceof Object ) &&
					( uxExtSpect.util.StringOf.constructorName( value ) !== '' ) &&
					( !( value instanceof RegExp ) ) &&
					( !( value instanceof HTMLElement ) ) && // many Ext.Loader.scriptElements
					( uxExtSpect.util.StringOf.propertyCount( Object ) > 0 )
					);
			return result;
		},

		pushItemOnArray: function ( item, index, len ) {
			this.push( item );
			return true;
		},

		extCollectionToArray: function ( collection ) {
			var array = [];
			collection.each( this.pushItemOnArray, array );
			return array;
		},
		// TODO: BUG. Ext.Array.toArray does not work
		// function extCollectionToArray( collection )
		// {	return Ext.Array.toArray( collection ) }

		htmlCollectionToArray: function ( collection ) {
			var array = [];
			for ( var len = collection.length , index = 0; index < len; index++ ) {
				array.push( collection.item( index ) ); }
			return array;
		}
	}
);

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
