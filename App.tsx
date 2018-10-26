import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView, ActivityIndicator, Dimensions, BackHandler, ToastAndroid, StatusBar } from 'react-native';

type Props = {};
export default class App extends Component<Props>
{
    private backExitFlag: boolean = false;

    public state = 
    {
        loading: false
    }

    public constructor(props: Props)
    {
        super(props);
        this.state = { loading: true };
    }

    public componentDidMount(): void
    {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    public componentWillUnmount(): void
    {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick.bind(this));
    }

    public render(): JSX.Element 
    {
        let {height, width} = Dimensions.get('window');
        return (
            <View style={{ flex: 1}}>
                {/* <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                /> */}
                <WebView
                    onLoad={() => this.hideLoading()}
                    source={{ uri: 'http://192.168.0.39:8000/' }}
                    style={Platform.OS === 'ios' && { marginTop: 20, flex: 1 }}
                    useWebKit={true}
                />
                {this.state.loading
                && (<ActivityIndicator 
                        style={{ position: "absolute", top: height / 2, left: width / 2 }}
                        size="large"
                    />)}
            </View>
        );
    }

    private hideLoading(): void 
    {
        this.setState({ loading: false });
    }

    private handleBackButtonClick(): boolean
    {
        if (!this.backExitFlag)
        {
            this.backExitFlag = true;
            ToastAndroid.show('한번 더 누르면 앱을 종료합니다.', ToastAndroid.BOTTOM);
            setTimeout(() => this.backExitFlag = false, 1200);
            return true;
        }
        else
            return false;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
