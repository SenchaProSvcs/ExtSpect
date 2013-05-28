Ext.define( 'uxExtSpect.view.tree.toolbar.ComponentsTreeToolbar',
	{  extend: 'uxExtSpect.view.tree.toolbar.TreeListToolbar',
		xtype: 'componentstreetoolbar',
		requires: [
			'uxExtSpect.view.tree.button.show.ComponentsButton',
			'uxExtSpect.view.tree.button.show.ContainersOnlyButton'
		],

		config: {
			items: [
				{  xtype: 'treelistingbuttons' },
				{  xtype: 'spacer',
					width: 20
				} ,
				{  xtype: 'segmentedbutton',
					items: [
						{ xtype: 'containersonlybutton', pressed: true },
						{ xtype: 'componentsbutton' }
					]
				}
			]
		}
	}
);
