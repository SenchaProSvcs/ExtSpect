Ext.define( 'extspect.view.tree.button.sort.ListingButton',
	{  extend : 'extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'listingbutton',
		config : {    text : 'Listing',
			handler : function () { this.showListing(); }
		}
	}
);
