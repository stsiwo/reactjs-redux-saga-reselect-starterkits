module.exports = {
  "roots": [
    "<rootDir>/tests/",
    "<rootDir>/src/"
  ],
  "testRegex": "\\.(spec|test)\\.tsx?$",
  "moduleNameMapper": {
      "\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
      // sometime, might encounter 'cannot find module' error. 
      // change the order of below mapping helps solve the error
      "^hooks(.*)$": "<rootDir>/src/ui/hooks$1", 
      "^contexts(.*)$": "<rootDir>/src/ui/contexts", 
      "^components(.*)$": "<rootDir>/src/ui/components$1", 
      "^ui(.*)$": "<rootDir>/src/ui$1", 
      "^requests(.*)$": "<rootDir>/src/requests$1", 
      "^domain(.*)$": "<rootDir>/src/domain$1", 
      "^actions(.*)$": "<rootDir>/src/actions$1", 
      "^states(.*)$": "<rootDir>/src/states$1", 
      "^reducers(.*)$": "<rootDir>/src/reducers$1", 
      "^sideEffects(.*)$": "<rootDir>/src/sideEffects$1", 
      "^configs(.*)$": "<rootDir>/src/configs$1", 
      "^src(.*)$": "<rootDir>/src$1", 
      //
      // remove below because of this error: 
      // Could not locate module static-extend mapped as:
      // /home/sts/Documents/Workspace/Jobs/RyoheiKatoBlogApp/spa/static.
      //
      //"^static(.*)$": "<rootDir>/static",  
      "^tests(.*)$": "<rootDir>/tests", 
    },
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "setupFilesAfterEnv": ["<rootDir>/tests/jest-dom.config.ts"],
  "globals": {
       "NODE_ENV": 'testing',
       "API1_URL": 'http://api.stsiwo.com',
       "PUBLIC_IMAGE_PATH": '/images/',
     },
}
