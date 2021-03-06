Ext.define( 'uxExtSpect.view.tree.button.SegmentedTreeButtonListingButton',
	{  extend: 'Ext.SegmentedButton',
		xtype: 'treelistingbuttons',
		requires: [
			'uxExtSpect.view.tree.button.sort.TreeButton' ,
			'uxExtSpect.view.tree.button.sort.IndentingButton',
			// 'uxExtSpect.view.tree.button.sort.ListingButton'
		],
		config: {
			items: [
				{ xtype: 'treebutton', pressed: true },
				{ xtype: 'indentingbutton' }
				// , { xtype: 'listingbutton' }
			]
		}
	}
);
