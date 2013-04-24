Ext.define( 'ux.extspect.view.tree.tabpanel.TreeTabPanel',
	{  extend : 'ux.extspect.view.ExtSpectTabPanel',
		xtype : 'treetabpanel',
		requires : [
			'ux.extspect.view.tree.datalist.ExtTree' ,
			'ux.extspect.view.tree.datalist.AppTree' ,
			'ux.extspect.view.tree.toolbar.AppTreeToolbar' ,
			'ux.extspect.view.tree.datalist.ComponentsTree' ,
			'ux.extspect.view.tree.toolbar.BasicTreeToolbar' ,
			'ux.extspect.view.tree.datalist.ClassesTree' ,
			'ux.extspect.view.tree.toolbar.ClassesTreeToolbar'
		],

		config : {    items : [
			{  title : 'Components',
				items : [
					{ xtype : 'componentstree' } ,
					{ xtype : 'basictreetoolbar' }
				]
			} ,
			{  title : 'Classes',
				items : [
					{ xtype : 'classestree' } ,
					{ xtype : 'classestreetoolbar' }
				]
			} ,
			{  title : 'App',
				items : [
					{ xtype : 'apptree' } ,
					{ xtype : 'apptreetoolbar' }
				]
			} ,
			{  title : 'Ext',
				items : [
					{ xtype : 'exttree' } ,
					{ xtype : 'basictreetoolbar' }
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
