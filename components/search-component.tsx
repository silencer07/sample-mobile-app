import React from "react";
import {Icon, Input} from "native-base";
import {MaterialIcons} from "@expo/vector-icons";

export function SearchComponent(props: { onSubmitEditing: (e: any) => Promise<void> }) {
    return <Input placeholder="Search News" width="100%" borderRadius="4" py="3" px="1"
                  fontSize="14"
                  InputLeftElement={
                      <Icon m="2" ml="3" size="6" color="gray.400" as={<MaterialIcons name="search"/>}/>
                  }
                  onSubmitEditing={props.onSubmitEditing}
    />;
}

export default SearchComponent