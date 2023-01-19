import React, {useCallback, useEffect, useRef} from "react";
import {FlatList, HStack, NativeBaseProvider, Spinner, Switch, Text, useColorMode, VStack,} from "native-base";
import {SafeAreaView} from "react-native";
import useAppStore, {FetchStatus} from "./store/app-store";
import SearchComponent from "./components/search-component";
import NewsItem from "./components/news-item";


export default function App() {
    const appStore = useAppStore()
    const {articles, fetchArticles, status} = appStore
    const searchQueryRef = useRef<string>("")

    useEffect(() => {
        if (status === FetchStatus.ERROR) {
            alert("Problem while fetching news! Please try again later.")
        }
    }, [status])

    const onSearchQueryEntered = useCallback(async (e: any) => {
        console.log(e.nativeEvent.text)
        searchQueryRef.current = e.nativeEvent.text
        await fetchArticles(searchQueryRef.current)
    }, [])

    const onReachEnd = useCallback(async () => {
        console.log("reach end")
        await fetchArticles(searchQueryRef.current)
    }, [])

    return (
        <NativeBaseProvider>
            <SafeAreaView>
                <VStack w="100%" space={5} alignSelf="center">
                    <SearchComponent onSubmitEditing={onSearchQueryEntered}/>
                    <FlatList
                        data={articles}
                              renderItem={({item, index}) => (
                                  <NewsItem key={`article=${index}`} item={item}/>
                              )}
                              onEndReached={onReachEnd}
                              ListFooterComponent={status === FetchStatus.FETCHING ?
                                  <Spinner color='emerald.500' size='lg'/> : null}
                    />
                </VStack>
            </SafeAreaView>
        </NativeBaseProvider>
    );
}

// Color Switch Component
function ToggleDarkMode() {
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <HStack space={2} alignItems="center">
            <Text>Dark</Text>
            <Switch
                isChecked={colorMode === "light"}
                onToggle={toggleColorMode}
                aria-label={
                    colorMode === "light" ? "switch to dark mode" : "switch to light mode"
                }
            />
            <Text>Light</Text>
        </HStack>
    );
}
