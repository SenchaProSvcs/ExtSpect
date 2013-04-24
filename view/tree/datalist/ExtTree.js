
Ext.define( 'ux.extspect.view.tree.datalist.ExtTree' ,
	{	extend : 'ux.extspect.view.tree.datalist.PropertiesTree' ,
		xtype : 'exttree' ,

		requires :
		[	'ux.extspect.object.rec.ExtRec' , 'ux.extspect.object.rec.LeafRec'
		] ,

		// Do NOT put Ext as a value in a config. You get to stackoverflow from cloning
		fetchRootObject : function ( )
		{	return Ext; } ,

		determineRecClassName : function ( object )
		{	var recClassName;
			if ( object === Ext )
			{	recClassName = 'ux.extspect.object.rec.ExtRec'; }
			else
			if ( object === Ext.Ajax )
			{	recClassName = 'ux.extspect.object.rec.LeafRec'; }
			else
			if ( object instanceof Ext.app.Application )
			{	recClassName = 'ux.extspect.object.rec.LeafRec'; }
			else
			if ( object instanceof Ext.env.Browser )
			{	recClassName = 'ux.extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.ClassManager )
			{	recClassName = 'ux.extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.ComponentQuery ) // cache is interesting for listeners
			{	recClassName = 'ux.extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.ComponentManager )
			{	recClassName = 'ux.extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.data.ModelManager )
			{	recClassName = 'ux.extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.Router )
			{	recClassName = 'ux.extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.data.StoreManager )
			{	recClassName = 'ux.extspect.object.rec.LeafRec'; }
			else
			{	recClassName = this.callParent( arguments ); }
			return recClassName;
		}
	}
);
