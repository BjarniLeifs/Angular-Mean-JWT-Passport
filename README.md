# Angular-Mean-JWT-Passport

#### How to use!

	Start by cloning the project and read this readme.me
	
	You will be needing nodemon for the server, it helps to restart and maintain all things 
	in this application with grunts assistance.

##### Usefull to know.

	If you do not have everything installed it should be installed with npm see Dependances, 
	if for some reason the project wont start normaly, there might be two resons for it.

	1. You do not have all tools installed, contact members for information or try install 
	   them your'e self.

	2. For some reson someone rage pushed on git leading to bad code. (bad code)
	
	If installing needed tools do not help you out, please get in touch with members 
	before trying to change the code. 


##### Nodemon

	Nodemon is just like node, to start node you do fx. node app.js. However if nodemon is used 
	you will type nodemon app.js. This is a handy tool to use. It restarts server if any changes 
	are made to the server leading you not to worry about restarting it all the time like using 
	node app.js. 

	If not installed you will need to do so : 
	
		npm install -g nodemon
	
		(-g stands for global, there for it is installed to your'e computer)

	If installed, do not worry about it. package.json has it as devdependance it should be installed 
	but none the less if accounter error. You will need to install it since the grunt will use it 
	to start the server.
	
	The server is started on port 3000

##### Dependances

	There are a lot of dependance's in package.json file, and some extra devdependance's please 
	install it before you try running the project.

	Do so with :
		npm install -d

##### Database	
	
	We use mongodb / mongoose in this project it is in package.json if any trouble getting the 
	project up and running you might need to install mongodb found at https://www.mongodb.org
	Information on how to install can be found at http://docs.mongodb.org/manual/
		
		If installed.
		
		mongod --dbpath "path to your database"   fx deault path on mongodb is : /data/db 
	

##### Grunt
	
	To start the server you only need to type grunt in the project folder

		grunt
	
	Grunt is configured to handle everything that change's in the project and will do so 
	automaticly for you at all times. Do not change public/main folder at anytime!
	See gruntfile.js for more information about what is in it.	
	
##### Coding rules (Work in progress)

	Please follow the coding rules, read over the project and see how it is setup and follow it.
	It will make code consistancy in the project and consistant style. 

	1. Do not push on master branch unless you have made sure the code is stable and working 
	   properly, prefer solution is to send pull request.
	
	2. We prefer to have brances, not needed if carfull on how we push on git.

	3. Name on folders and files.

		Folders : Named with lowercase
		Files 	: Named with both lowercase and uppercase
					Models in server folder is uppercase 
					Other files are lowercase

	4. Folder structure

		Main
			..bin
				..www (main server logic).
			..*node_modules*
			..public (Angular project)
				..javascript
					..controllers (angular controllers)
					..services	(factories, getting things from server)
					.angularApp.js (routings)
				..main (grunt injections of files to use) DO NOT CHANGE FILES.
					.myApp.css
					.myApp.js
					.myApp.min.css
					.myApp.min.js
				..stylesheets
					..css
						.style.css
						.*other files to use for each view.. will be injected
					..less
						.*other files to use for each view.. will be injected
				..vews
					.fileName.html 
			..server
				..config (This is global configuration to use. One place change in server)
					.database.js
					.passport.js
					.secrets.js
					.*other files to use for configuration will build up.
				..models (This is schema for mongodb and logic needed)
					.Comments.js
					.Posts.js
					.Users.js
					.*other files to use for schems in the project will build up.
				..routes (Api calls, dont use only index... make new for each part)
					.basicRoutesToStart.js (DO NOT CHANGE, for copy to new routes)
					.index.js
					.posts.js
					.users.js
					.*other files to use for routes to make better oversight of api.
		.gruntfile.js
		.info.md
		.package.json
		.README.md
		.server.js

	5. Code sample

		function (req, res) {
			if (err) {
				....
			}
			....
		};

		For all variable use camelCase fx : 

			var thisHere = 1 + 1;

		For variable for Schema we use Pascal casing fx : 

		var UserSchema = new mongoose.Schema({
		    username: {
		        type: String, 
		        lowercase: true, 
		        unique: true
		    },
		    hash: String,
		    salt: String
		});

		app.controller('AuthCtrl', ['$scope', '$state', 'auth',
    			function ($scope, $state, auth) {
        			....
    			}
    		]);
    
    6. Comments
    		
    		Please comment code briefly at all times. It doesn't matter how great your'e code
    		looks, ut doesn't matter how great and good programmer you are. At some point 
    		someone will be looking at the code, changing it, adding to it. When working on 
    		projects it's best to comment some thought down, this will help you and others
    		to get better understanding of the code, setup and geting into the code in better
    		time. Be fare with yourself and others.
    		
    		Please read this short article about the subject comments, it will change the way
    		you will code to the better with simple changes without have to change large 
    		factor in your coding skills.
    		
    		http://blog.codefx.org/techniques/documentation/comment-your-fucking-code/
    		
    		Comment your'e code, be a teamplayer! 
    		
    7. (Work in progress).


##### Troubleshoot (Work in progress)

###### If error with mongod or mongoose when starting server.
	
	1. Check if the mongodb is running with mongod or mongod --dbpath "path/to/database"
	2. Add more info if found and needed.

###### If port of the server doesn't shut down.
	
	1. Get to know something about fg (foreground) and bg (background).
	
	2. If skip 1st then try do jobs in terminal to see all current jobs, if you
	see job [1] you might have hit ctrl-z. That puts the job in pause/stop in bg and still
	running on the port. then you can do fg 1 and put it in play again. Remember to use ctrl-c 
	to terminate process. 
	
	3. Add more info if found and needed.

###### Please continue this Troubleshoot as we go.... thank you 
