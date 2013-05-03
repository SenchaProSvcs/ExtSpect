Ext.define( 'uxExtSpect.view.tree.button.sort.ListingButton',
	{  extend : 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype : 'listingbutton',
		config : {    text : 'Listing',
			handler : function () { this.showListing(); }
		}
	}
);
