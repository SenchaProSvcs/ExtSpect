Ext.define( 'uxExtSpect.view.tree.toolbar.ClassesTreeToolbar',
	{  extend : 'uxExtSpect.view.tree.toolbar.TreeListToolbar',
		xtype : 'classestreetoolbar',
		requires : [
			'uxExtSpect.view.tree.button.show.InstancesButton' ,
			'uxExtSpect.view.tree.button.show.ClassesOnlyButton'
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
			} ,
			{    xtype : 'segmentedbutton',
				items : [
					{    xtype : 'instancesbutton' } ,
					{    xtype : 'classesonlybutton' }
				]
			}
		]
		}
	}
);
