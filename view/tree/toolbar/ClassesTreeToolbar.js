Ext.define( 'ux.extspect.view.tree.toolbar.ClassesTreeToolbar',
	{  extend : 'ux.extspect.view.tree.toolbar.TreeListToolbar',
		xtype : 'classestreetoolbar',
		requires : [
			'ux.extspect.view.tree.button.show.InstancesButton' ,
			'ux.extspect.view.tree.button.show.ClassesOnlyButton'
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
