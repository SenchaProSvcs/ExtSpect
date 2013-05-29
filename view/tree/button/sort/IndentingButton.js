Ext.define( 'uxExtSpect.view.tree.button.sort.IndentingButton',
	{  extend: 'uxExtSpect.view.tree.button.TreeListToolbarButton',
		xtype: 'indentingbutton',
		config: {
			text: 'Indent',
			handler: function () { this.showIndented(); }
		}
	}
);
