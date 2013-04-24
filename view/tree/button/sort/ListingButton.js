Ext.define( 'ux.extspect.view.tree.button.sort.ListingButton',
	{  extend : 'ux.extspect.view.tree.button.TreeListToolbarButton',
		xtype : 'listingbutton',
		config : {    text : 'Listing',
			handler : function () { this.showListing(); }
		}
	}
);
