Ext.define( 'uxExtSpect.view.tree.tabpanel.TreeTabPanel',
	{  extend: 'uxExtSpect.view.ExtSpectTabPanel',
		xtype: 'treetabpanel',
		requires: [
			'uxExtSpect.view.tree.datalist.ExtTree' ,
			'uxExtSpect.view.tree.datalist.AppTree' ,
			'uxExtSpect.view.tree.datalist.ComponentsTree' ,
			'uxExtSpect.view.tree.toolbar.ComponentsTreeToolbar' ,
			'uxExtSpect.view.tree.toolbar.BasicTreeToolbar' ,
			'uxExtSpect.view.tree.datalist.ClassesTree' ,
			'uxExtSpect.view.tree.toolbar.ClassesTreeToolbar'
		],

		config: {
			items: [
				{  title: 'Components',
					items: [
						{ xtype: 'componentstree' },
						{ xtype: 'componentstreetoolbar' }
					]
				},
				{  title: 'Classes',
					items: [
						{ xtype: 'classestree' } ,
						{ xtype: 'classestreetoolbar' }
					]
				},
				{  title: 'Ext',
					items: [
						{ xtype: 'exttree' } ,
						{ xtype: 'basictreetoolbar' }
					]
				},
				{  title: 'App',
					items: [
						{ xtype: 'apptree' } ,
						{ xtype: 'basictreetoolbar' }
					]
				}
				/*
				 {	title : '! Doc' ,
				 html : 'UNDER CONSTRUCTION'
				 } ,
				 {	title : '! Dom' ,
				 html : 'UNDER CONSTRUCTION'
				 }
				 {	title : '! Css' ,
				 html : 'UNDER CONSTRUCTION'
				 } */
			] }

	}
);
