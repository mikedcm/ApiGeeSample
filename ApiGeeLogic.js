var myclient;

function LogIn()
{
  myclient = new Usergrid.Client({
	orgName:"MikePete",
	appName:"sandbox"});
}

function createPerson(myEntity)
{
myclient.createEntity(myEntity, function(error, createdEntity) //creates an entity
{
	if(error){console.log('could not create entity');}
	else {console.log("created entity "+createdEntity.get("uuid"));} //to retrieve entity properties
});
}

function displayQueryResult(people, displayEl)
{
  displayEl.innerHTML="";
  while(people.hasNextEntity())
  {
    var person=people.getNextEntity();
    var first=person.get('first');
    var last=person.get('last');
    var job=person.get('job');
    displayEl.innerHTML+=first+" "+last+" "+job+"<br>";
  }
}

function queryPerson(queryOption,displayAt)
{
myclient.createCollection(queryOption, function(error,people)
{
	if(error) console.log('could not query collection');
	else {		
		displayQueryResult(people,displayAt);}	
});
}

function loadList(columns)
{
	if(columns.length==0)
	{
	var options={
	  type: 'person',
	  client: myclient};
	var collection=new Usergrid.Collection(options);
	collection.fetch(function()
		{
		var prop=[];
		for(var p in collection._list[0]._data)
			if(p!='created'&&p!='metadata'&&p!='modified'&&p!='type'&&p!='uuid')
			prop.push(p);
		for(var i=0;i<prop.length;i++)
		{
			var opt=document.createElement('option');
			opt.value=prop[i];
			opt.innerHTML=prop[i];
			columns.add(opt);
		}
		},
		function(error) { if(error) console.log('could not find collection');} );
	}
}

function FormQuery(col,op,qText)
{
	var theQuery="where "+col.value+" "+op.value+" '"+qText+"'";
	return theQuery;
}

