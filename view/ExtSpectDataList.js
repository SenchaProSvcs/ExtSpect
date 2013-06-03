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

			itemHeight: 16, // added for Touch 2.2
			// This becomes style="min-height:16px !important!" in the elements

			listeners: {
				itemsingletap: function () { this.handleItemSingleTap.apply( this, arguments ); },
				itemdoubletap: function () { this.handleItemDoubleTap.apply( this, arguments ); },
				painted: function () { this.handlePainted.apply( this, arguments ); }
			}
		},

		isFunction: uxExtSpect.util.StringOf.isFunction,

		isClass: uxExtSpect.util.StringOf.isExtClass,

		valueStringOf: function ( value ) {
			return  uxExtSpect.util.StringOf.to$( value );
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

		handlePainted: function () { this.computeAndSetData(); },

		computeAndSetData: function () {
			var previousStore = this.getStore();
			if ( previousStore ) { Ext.StoreManager.unregister( previousStore ); }

			this.determineAndSetIndexBar();
			var rowObjects = this.collectRowObjects();
			// rowObjects.forEach( this.setRowString, this );
			var storeName = this.determineStoreName();
			var store = Ext.create( storeName );
			store.setData( rowObjects );
			this.setStore( store );
		},

		determineStoreName: function () {
			var storeName = this.storeName || this.fetchParentNavigationView().dataListStoreName;
			return storeName;
		},

		// An instance here is defined as an object with a named constructor
		// The Instance must have at least 1 property
		// A config object is not an instance, nor is a RegEx
		isInstance: function ( value ) {
			var result =
				(  ( value instanceof Object ) &&
					( uxExtSpect.util.StringOf.constructorName( value ) !== '' ) &&
					( ! ( value instanceof RegExp ) ) &&
					( ! ( value instanceof HTMLElement ) ) && // many Ext.Loader.scriptElements
					// ( ! this.isExtObject( value ) ) &&
					( uxExtSpect.util.StringOf.propertyCount( Object ) > 0 )
					);
			return result;
		},

		extCollectionToArray: function ( collection ) {
			return collection.items; // 5/28/13
		},

		htmlCollectionToArray: function ( collection ) {
			var array = [];
			for ( var len = collection.length , index = 0; index < len; index ++ ) {
				array.push( collection.item( index ) );
			}
			return array;
		},

		handleItemDoubleTap: function ( dataview, index, listItem, record ) {
			console.log(arguments.callee.displayName);
			this.handleItemSingleTap( dataview, index, listItem, record )
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
