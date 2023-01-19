import React from "react";
import {Divider, Text, VStack} from "native-base";

export function NewsItem(props: { item: any }) {
    return <VStack>
        <Text fontWeight={"bold"}>
            {props.item.title}
        </Text>
        <Text>
            {props.item.description}
        </Text>
        <Divider/>
    </VStack>;
}

export default NewsItem