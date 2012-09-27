Ext.define( 'extspect.view.tree.toolbar.AppTreeToolbar',
	{  extend : 'extspect.view.tree.toolbar.TreeListToolbar',
		xtype : 'apptreetoolbar',
		requires : [
			'extspect.view.tree.button.show.NoListenersButton' ,
			'extspect.view.tree.button.show.ListenersButton'
		],

		config : {    items : [
			{    xtype : 'segmentedbutton',
				items : [
					{    xtype : 'treebutton' } ,
					{    xtype : 'listingbutton' }
				]
			} ,
			{    xtype : 'spacer',
				width : 20
			}
			/* ,
			 {	xtype : 'segmentedbutton' ,
			 items :
			 [	{	xtype : 'nolistenersbutton' } ,
			 {	xtype : 'listenersbutton' }
			 ]
			 }*/
		]
		}
	}
);
