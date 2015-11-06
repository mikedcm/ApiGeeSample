var client;
//var myEntity={type:'person', name:'secondOne', first:'jane',last:'doe',job:'analyst'};

function LogIn()
{
  client = new Usergrid.Client({
	orgName:"MikePete",
	appName:"sandbox"});
}

function createPerson(myEntity)
{
client.createEntity(myEntity, function(error, createdEntity) //creates an entity
{
	if(error){console.log('could not create entity');}
	else {console.log("created entity "+createdEntity.get("uuid"));} //to retrieve entity properties
});
}

function displayQueryResult(people, displayEl)
{
  while(people.hasNextEntity())
  {
    var person=people.getNextEntity();
	var props=person.get();
	for(var pr in props)
		displayEl.innerHTML+=props[pr];
    var first=person.get('first');
    var last=person.get('last');
    var job=person.get('job');
    displayEl.innerHTML+=first+" "+last+" "+job+"<br>";
  }
}

function queryPerson(queryOption,displayAt)
{
client.createCollection(queryOption, function(error,people)
{
	if(error) console.log('could not query collection');
	else {		
		displayQueryResult(people,displayAt);}	
});
}

