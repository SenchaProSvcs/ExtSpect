Ext.define( 'extspect.view.tree.toolbar.ClassesTreeToolbar',
	{  extend : 'extspect.view.tree.toolbar.TreeListToolbar',
		xtype : 'classestreetoolbar',
		requires : [
			'extspect.view.tree.button.show.InstancesButton' ,
			'extspect.view.tree.button.show.ClassesOnlyButton'
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
