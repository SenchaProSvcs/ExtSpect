
Ext.define( 'extspect.view.tree.datalist.ExtTree' ,
	{	extend : 'extspect.view.tree.datalist.PropertiesTree' ,
		xtype : 'exttree' ,

		requires :
		[	'extspect.object.rec.ExtRec' , 'extspect.object.rec.LeafRec'
		] ,

		// Do NOT put Ext as a value in a config. You get to stackoverflow from cloning
		fetchRootObject : function ( )
		{	return Ext; } ,

		determineRecClassName : function ( object )
		{	var recClassName;
			if ( object === Ext )
			{	recClassName = 'extspect.object.rec.ExtRec'; }
			else
			if ( object === Ext.Ajax )
			{	recClassName = 'extspect.object.rec.LeafRec'; }
			else
			if ( object instanceof Ext.app.Application )
			{	recClassName = 'extspect.object.rec.LeafRec'; }
			else
			if ( object instanceof Ext.env.Browser )
			{	recClassName = 'extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.ClassManager )
			{	recClassName = 'extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.ComponentQuery ) // cache is interesting for listeners
			{	recClassName = 'extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.ComponentManager )
			{	recClassName = 'extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.data.ModelManager )
			{	recClassName = 'extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.Router )
			{	recClassName = 'extspect.object.rec.LeafRec'; }
			else
			if ( object === Ext.data.StoreManager )
			{	recClassName = 'extspect.object.rec.LeafRec'; }
			else
			{	recClassName = this.callParent( arguments ); }
			return recClassName;
		}
	}
);
