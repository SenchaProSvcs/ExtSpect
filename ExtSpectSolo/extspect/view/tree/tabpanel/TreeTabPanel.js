Ext.define( 'extspect.view.tree.tabpanel.TreeTabPanel',
	{  extend : 'extspect.view.ExtSpectTabPanel',
		xtype : 'treetabpanel',
		requires : [
			'extspect.view.tree.datalist.ExtTree' ,
			'extspect.view.tree.datalist.AppTree' ,
			'extspect.view.tree.toolbar.AppTreeToolbar' ,
			'extspect.view.tree.datalist.ComponentsTree' ,
			'extspect.view.tree.toolbar.BasicTreeToolbar' ,
			'extspect.view.tree.datalist.ClassesTree' ,
			'extspect.view.tree.toolbar.ClassesTreeToolbar'
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
