## Greetings %username% !

This is a quick manual on what we expect from you during performing the test task.
This will be a simple app that contains two features: Login & Convert file to docx feature.

## Getting Started

### Pre-requisites
Node 18 or higher (20-22 preferred)
Project uses React 19, but react-dropzone doesn't support it yet, so need legacy deps.
```sh
npm install --legacy-peer-deps
```
## Run the app
```sh
npm run dev
```
Terminal will provide a link to the app.
By default, it will be `http://localhost:3000` (aka `origin`)

#### Login Credentials:
- email: `aqa@example.com`
- password: `SecurePassword`

* First of all, get to know with the application under test, build the web app and check out its possibilities and bugs. 

* Second of all, we need to evaluate your qa manual background, so create down below:
 - short testplan 
 - list of the testcases
 - list of discovered issues
 
* Third of all, write test automation according test automation purposes  

* And fourth of all, push the whole project to github.com and notice us with a link to your repo on completion. 

Please reachout Oksana (otolstykh@readdle.com) if you have any questions.

## Good Luck!
* p.s. Do not tamper codebase of application
* You can modify only `/web-aqa/src/lib/config.ts` to generate more or less errors


#YOUR TASK STARTS HERE: 

# TEST PLAN: 

- Environment:
manual testing: Chrome browser;
automation testing: Chrome, Firefox and Safari;

- What parts of app will be tested:
web functional tests to be executed;




# LIST OF TEST CASES: 
// Log in
- Perform login with empty password field
- Validate if email contains @ symbol
- Validate if email can not contain special symbols
- Validate different combinations to check case sensetivity for the credentials
- Verify length of input fileds 
- Perform valid log in
- Verify error message is shown for invalid log in

// Log out
- Check if user can log out from different pages
- Check the history is saved after log out anf loggin in again

//Welcome page

//Upload file
- Verify after uploading any file counter in history is increased 

//Convert page
- Upload a file by using different options : drag&drop or selecting from repo
- Verify invalid file type is not acceptable




# LIST OF DISCOVERED ISSUES:
// Login 
1) Entering incorect password results no error message (randomly reproducing) - ✅ Automated
2) Entering incorect password results message with sensetive data or hardcoded username: "Provided password is for the user "user25@example.com". Use another one." - message should be improved to avoid showing usename. ✅ Automated
3) "This is an invalid password for this email" error message is shown when entering invalid credentials. Due to sequirity message should be improved - it should not include any reference to the valid usage of credentials. ✅ Automated

//Upload
4) Selecting multuple valid files results an error - TypeError: Cannot read properties of undefined (reading 'name')
5) Alert icon is not representing correct state: Green successful alert with "X" icon on Upload valid doc.


-

