Ext.Loader.require( 'uxExtSpect.util.StringOf' );
Ext.Loader.require( 'uxExtSpect.util.ExtspectString' );

Ext.define( 'uxExtSpect.ExtSpect',
	{  extend: 'Ext.Panel',
		xtype: 'extspect',
		id: 'es-extspect',

		requires: [
			'uxExtSpect.view.object.ObjectNavigationView',
			'uxExtSpect.view.tree.TreeNavigationView' ,
			'uxExtSpect.object.rec.BaseRec'
		],

		config: {
			// iconCls, iconMask and title are here in case the view is used inside a tab panel
			iconCls: 'search',
			iconMask: true,
			title: 'ExtSpect',
			app: undefined,

			items: [
				{  xtype: 'container',
					layout: { type: 'hbox' },
					items: [
						{ xtype: 'treenavigationview' } ,
						{ xtype: 'objectnavigationview' }
					]
				}
			],

			// The top/starting object in the tree views
			rootObject: Ext.Viewport ///,
		},

		constructor: function ( config ) {
			uxExtSpect.instance = this;
			this.callParent( arguments );
		},

		// Add a CSS link to the document
		// <link type = "text/css" rel = "stylesheet" href = "....css">
		addCssLinkElement: function ( href ) {
			var linkElement = document.createElement( 'link' );
			linkElement.type = 'text/css';
			linkElement.rel = 'stylesheet';
			linkElement.href = href;
			document.head.appendChild( linkElement );
		},

		addCssFile: function ( fileName ) {
			var path = Ext.Loader.getPath( 'uxExtSpect.ExtSpect' );
			var index = path.indexOf( 'ExtSpect.js' );
			path = path.substring( 0, index ) + 'resources/' + fileName;
			// console.log( arguments.callee.displayName, index, path );
			this.addCssLinkElement( path );
		},

		initialize: function () {
			// this.callParent( arguments );

			this.addCssFile( 'extspect.css' );

			if ( ! this.getApp() ) {
				console.error( 'uxExtSpect.initialize() did not receive a value for the config property app:' );
			}

			// allows for a different top level component other than Viewport
			if ( this.startObject ) {
				var navView = this.fetchObjectNavigationView();
				navView.setStartObject( this.startObject );
			}
		},

		fetchObjectNavigationView: function () {
			return Ext.ComponentQuery.query( 'objectnavigationview' )[ 0 ];
		},

		fetchTreeNavigationView: function () {
			return Ext.ComponentQuery.query( 'treenavigationview' )[ 0 ];
		}
	}
);
