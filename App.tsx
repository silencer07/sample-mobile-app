import React from "react";
import {
    Divider,
    extendTheme,
    HStack,
    Icon,
    Input,
    NativeBaseProvider,
    Switch,
    Text,
    useColorMode,
    VStack,
} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native";
import useAppStore from "./store/app-store";

// Define the config
const config = {
    useSystemColorMode: false,
    initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({config});
type MyThemeType = typeof theme;
declare module "native-base" {
    interface ICustomTheme extends MyThemeType {
    }
}
export default function App() {
    const appStore = useAppStore()
    const {articles, fetchArticles} = appStore
    return (
        <NativeBaseProvider>
            <SafeAreaView>
                <VStack w="100%" space={5} alignSelf="center">
                    <Input placeholder="Search News" width="100%" borderRadius="4" py="3" px="1"
                       fontSize="14"
                       InputLeftElement={
                           <Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search"/>}/>
                       }
                       onSubmitEditing={async (e) => {
                           console.log(e.nativeEvent.text)
                           await fetchArticles(e.nativeEvent.text)
                       }}
                    />
                    {articles.map((a, index) => (
                        <VStack key={`article=${index}`}>
                            <Text fontWeight={"bold"}>
                                {a.title}
                            </Text>
                            <Text>
                                {a.description}
                            </Text>
                            <Divider  />
                        </VStack>
                        ))
                    }
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
