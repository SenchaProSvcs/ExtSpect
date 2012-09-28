Ext.Loader.require( 'extspect.util.StringOf' );
Ext.Loader.require( 'extspect.util.ExtSpectStringOf' );
Ext.Loader.require( 'extspect.util.Trace' );// for Trace.start(), Trace.end(), Trace.vars()

Ext.define( 'extspect.ExtSpect',
	{  extend : 'Ext.Panel',
		xtype : 'extspect',
		id : 'es-extspect',
		requires : [
			'extspect.view.object.ObjectNavigationView',
			'extspect.view.tree.TreeNavigationView' ,
			'extspect.object.rec.BaseRec'
		],

		config : { // iconCls, iconMask and title are here in case the view is used inside a tab panel
			iconCls : 'search',
			iconMask : true,
			title : 'ExtSpect',

			flex : 1,

			items : [
				{  xtype : 'container',
					layout : { type : 'hbox' },
					items : [
						{    xtype : 'treenavigationview' } ,
						{    xtype : 'objectnavigationview' }
					]    }
			],

			// The top/starting object in the tree views
			rootObject : Ext.Viewport,

			useTreeWithLines : true, // see note below
			treeIndentingChar : '&ensp;'  // &emsp; &ensp; &nbsp;
		},

		// Add a CSS link to the document
		// <link type = "text/css" rel = "stylesheet" href = "....css">
		addCssLinkElement : function ( href ) {
			var linkElement = document.createElement( 'link' );
			linkElement.type = 'text/css';
			linkElement.rel = 'stylesheet';
			linkElement.href = href;
			document.head.appendChild( linkElement );
		},

		constructor : function ( config ) {
			ExtSpect = this;
			Trace.vars( 'config', config );
			Trace.vars( ' this.app', this.app );
			this.callParent( arguments );
			Trace.vars( 'this.app', this.app );
		},

		initialize : function () {
			this.callParent( arguments );

			this.addCssLinkElement( 'extspect/resources/extspect.css' );

			if ( !this.app ) { console.error( 'ExtSpect.initialize() did not get a value for the config property app:' );}

			if ( this.startObject ) {
				var navView = this.fetchObjectNavigationView();
				navView.setStartObject( this.startObject );
			}
		},

		fetchObjectNavigationView : function () { return Ext.ComponentQuery.query( 'objectnavigationview' )[ 0 ]; },

		fetchTreeNavigationView : function () { return Ext.ComponentQuery.query( 'treenavigationview' )[ 0 ];}
	}
);

/* Notes for getUseTreeWithLines and getTreeIndentingChar
 Expect provides 2 options for showning trees in the left pane -
 with indenting and with lines.

 If you choose to have lines appear in the tree, then set
 useTreeWithLines : true ,
 Your index.html file should also load :
 <link href="extspect/resources/tree-with-lines.css" rel="stylesheet" type="text/css">

 If  you prefer to have a standard list appearence in both panes, then set
 useTreeWithLines : false ,
 In this case, ExtSpect will indent the contents of the list items using
 getTreeIndentingChar()
 */
