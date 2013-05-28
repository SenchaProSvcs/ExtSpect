Ext.define( 'uxExtSpect.view.tree.toolbar.ClassesTreeToolbar',
	{  extend: 'uxExtSpect.view.tree.toolbar.TreeListToolbar',
		xtype: 'classestreetoolbar',
		requires: [
			'uxExtSpect.view.tree.button.show.InstancesButton' ,
			'uxExtSpect.view.tree.button.show.ClassesOnlyButton'
		],

		config: {
			items: [
				{  xtype: 'treelistingbuttons' },
				{  xtype: 'spacer',
					width: 20
				},
				{  xtype: 'segmentedbutton',
					items: [
						{ xtype: 'classesonlybutton', pressed: true },
						{ xtype: 'instancesbutton' }
					]
				}
			]
		}
	}
);
