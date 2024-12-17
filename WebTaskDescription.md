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


## LIST OF TEST CASES: 
#### Log in
- Perform login with empty password field  ✅ Automated
- Validate if email contains @ symbol  ✅ Automated
- Validate if email can not contain special symbols 
- Validate different combinations to check case sensetivity for the credentials
- Verify length of input fileds 
- Perform valid log in  ✅ Automated
- Verify error message is shown for invalid log in  ✅ Automated

#### Log out
- Check if user can log out from different pages  ✅ Automated
- Check the history is saved after log out anf loggin in again  ✅ Automated

#### Welcome page
- Verify user is welcomed on the page after log in
- Verify link to Convert page is present
- Verify clicking on Logo navigates to Welcome page

#### Upload a file
- Upload a file by using different options : drag&drop or selecting from repo  ✅ Automated
- Verify it's possible to upload next file after clilking on close button ✅ Automated
- Verify after uploading any file counter of history link is increased 
- Verify Convert button is disabled when there is no file loaded
- Verify file details are shown: fileName, type, size

#### Convert a file
- Verify invalid file type is not convertable - Eror is shown  ✅ Automated
- Verify Convert button is disabled while processing the document and when it's completed 
- Verify Convert button is disabled when invalid file is uploaded ✅ Automated
- Verify close button is shown when file is uploaded or converted ✅ Automated
- Verify file details are shown: fileName, type, size 


#### Upload history 
- Verify link to history page is accesible from Convert page ✅ Automated
- Verify History page has button with link back to Convert page ✅ Automated
- Verify if there is one or more files listed, "Clear all entries" button is shown ✅ 
- Verify Clear All button removes all previously uploaded files ✅ Automated
- Verify each item section contains details about file: dateOfUpload, fileName, status, size 



## LIST OF DISCOVERED ISSUES:
#### Login 
1) Entering incorect password results no error message (randomly reproducing) - ✅ Automated
2) Entering incorect password results message with sensetive data or hardcoded username: "Provided password is for the user "user25@example.com". Use another one." - message should be improved to avoid showing usename. ✅ Automated
3) "This is an invalid password for this email" error message is shown when entering invalid credentials. Due to sequirity message should be improved - it should not include any reference to the valid usage of credentials. ✅ Automated
4) User is not directed to Welcome page after log in 

#### Upload
5) Selecting multuple valid files results an error - TypeError: Cannot read properties of undefined (reading 'name')
6) Alert icon is not representing correct state: Green successful alert with "X" icon on Upload valid doc.

#### Convert and Download 
7) Convering a file result showing error: "File is corrupted" (randomly reproducing)
8) 500 error when downloading docx document (randomly reproducing) ✅ Automated


