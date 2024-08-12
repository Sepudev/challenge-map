# challengeMap

React Native demo app consuming native module react-native-sepumap

## Installation

```sh
yarn install
yarn android
```
## Requirements

You will need a google maps api key generated in GCP (Google Cloud Platform).

## Android usage
 
 First, set your google maps key in android/app/src/main/AndroidManifest.xml as follows:

 ```xml
    <manifest xmlns:android="http://schemas.android.com/apk/res/android">
      <application>
        <activity>
          <intent-filter>
              <action android:name="android.intent.action.MAIN" />
              <category android:name="android.intent.category.LAUNCHER" />
          </intent-filter>
        </activity>
        <meta-data android:name="com.google.android.geo.API_KEY" android:value="YOUR_API_KEY_VALUE" />
      </application>
    </manifest>
```

### Example app running

![](https://res.cloudinary.com/dramvpuct/image/upload/v1723493006/demoApp_2_niisxb.gif)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

