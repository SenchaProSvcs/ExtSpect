Ext.define( 'uxExtSpect.view.tree.toolbar.AppTreeToolbar',
	{  extend : 'uxExtSpect.view.tree.toolbar.TreeListToolbar',
		xtype : 'apptreetoolbar',
		requires : [
			'uxExtSpect.view.tree.button.show.NoListenersButton' ,
			'uxExtSpect.view.tree.button.show.ListenersButton'
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
