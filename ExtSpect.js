Ext.Loader.require( 'uxExtSpect.util.StringOf' );
Ext.Loader.require( 'uxExtSpect.util.ExtspectString' );

Ext.define( 'uxExtSpect.ExtSpect',
	{  extend : 'Ext.Panel',
		xtype : 'extspect',
		id : 'es-extspect',
		requires : [
			'uxExtSpect.view.object.ObjectNavigationView',
			'uxExtSpect.view.tree.TreeNavigationView' ,
			'uxExtSpect.object.rec.BaseRec'
		],

		config : {
			// iconCls, iconMask and title are here in case the view is used inside a tab panel
			iconCls : 'search',
			iconMask : true,
			title : 'ExtSpect',
			app:undefined,

			flex : 1,

			items : [
				{  xtype : 'container',
					layout : { type : 'hbox' },
					items : [
						{ xtype : 'treenavigationview' } ,
						{ xtype : 'objectnavigationview' }
					]
				}
			],

			// The top/starting object in the tree views
			rootObject : Ext.Viewport,

			useTreeWithLines : true, // see note below
			treeIndentingChar : '&ensp;'  // &emsp; &ensp; &nbsp;
		},

		// Add a CSS link to the document
		// <link type = "text/css" rel = "stylesheet" href = "....css">
		addCssLinkElement : function ( href ) {
			// console.log( arguments.callee.displayName, href);
			var linkElement = document.createElement( 'link' );
			linkElement.type = 'text/css';
			linkElement.rel = 'stylesheet';
			linkElement.href = href;
			document.head.appendChild( linkElement );
		},

		constructor : function ( config ) {
			uxExtSpect.instance = this;
			// uxExtSpect.instance = this;
			this.callParent( arguments );
		},

		initialize : function () {
			// this.callParent( arguments );

			this.addCssLinkElement( '../ux/extspect/resources/extspect.css' );

			if ( !this.getApp() ) {
				console.error( 'uxExtSpect.initialize() did not receive a value for the config property app:' );
			}
			// console.log( arguments.callee.displayName, 'this.getApp()=', this.getApp() );
			// debugger;
			if ( this.startObject ) {
				var navView = this.fetchObjectNavigationView();
				navView.setStartObject( this.startObject );
			}
		},

		fetchObjectNavigationView : function () {
			return Ext.ComponentQuery.query( 'objectnavigationview' )[ 0 ];
		},

		fetchTreeNavigationView : function () {
			return Ext.ComponentQuery.query( 'treenavigationview' )[ 0 ];
		}
	}
);

/* Notes for getUseTreeWithLines and getTreeIndentingChar
 Extpect provides 2 options for showning trees in the left pane -
 with indenting and with lines.

 If you choose to have lines appear in the tree, then set
 useTreeWithLines : true

 If  you prefer to have a standard list appearence in both panes, then set
 useTreeWithLines : false ,
 In this case, ExtSpect will indent the contents of the list items using
 getTreeIndentingChar()
 */
