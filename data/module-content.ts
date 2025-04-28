export interface ModuleContent {
  id: string;
  title: string;
  sections: {
    title: string;
    content: string;
    codeExample?: {
      language: string;
      code: string;
    };
  }[];
}

export const moduleContents: Record<string, ModuleContent> = {
  'getting-started': {
    id: 'getting-started',
    title: 'Getting Started with React Native',
    sections: [
      {
        title: 'What is React Native?',
        content: 'React Native is a popular JavaScript framework that allows you to build mobile applications. It uses the same design as React, letting you compose a rich mobile UI from declarative components.\n\nWith React Native, you can create apps for both iOS and Android platforms using a single codebase, which significantly reduces development time and effort.',
      },
      {
        title: 'Setting Up Your Environment',
        content: 'To get started with React Native development, you need to set up your development environment. There are two ways to do this:\n\n1. **Expo CLI**: A framework and platform for universal React applications. It\'s the easiest way to get started.\n\n2. **React Native CLI**: Requires more setup but gives you more control over native code.',
        codeExample: {
          language: 'bash',
          code: '# Install Expo CLI\nnpm install -g expo-cli\n\n# Create a new project\nexpo init MyAwesomeProject\n\n# Navigate to project directory\ncd MyAwesomeProject\n\n# Start the development server\nexpo start',
        },
      },
      {
        title: 'Your First React Native App',
        content: 'Let\'s create a simple "Hello World" app to get familiar with React Native components.',
        codeExample: {
          language: 'jsx',
          code: 'import React from "react";\nimport { StyleSheet, Text, View } from "react-native";\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.text}>Hello, React Native!</Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: "#fff",\n    alignItems: "center",\n    justifyContent: "center",\n  },\n  text: {\n    fontSize: 24,\n    fontWeight: "bold",\n    color: "#333",\n  },\n});',
        },
      },
    ],
  },
  'components': {
    id: 'components',
    title: 'Core Components',
    sections: [
      {
        title: 'Introduction to Components',
        content: 'React Native provides a set of built-in core components that map directly to native UI elements. These components are the building blocks of your app\'s user interface.',
      },
      {
        title: 'View Component',
        content: 'The View component is the most fundamental component for building a UI. It\'s a container that supports layout with flexbox, style, touch handling, and accessibility controls.',
        codeExample: {
          language: 'jsx',
          code: 'import React from "react";\nimport { View, StyleSheet } from "react-native";\n\nexport default function ViewExample() {\n  return (\n    <View style={styles.container}>\n      <View style={styles.box} />\n      <View style={styles.box} />\n      <View style={styles.box} />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    flexDirection: "row",\n    justifyContent: "space-around",\n    alignItems: "center",\n  },\n  box: {\n    width: 80,\n    height: 80,\n    backgroundColor: "skyblue",\n    borderRadius: 10,\n  },\n});',
        },
      },
      {
        title: 'Text Component',
        content: 'The Text component is used to display text. It supports nesting, styling, and touch handling.',
        codeExample: {
          language: 'jsx',
          code: 'import React from "react";\nimport { Text, StyleSheet, View } from "react-native";\n\nexport default function TextExample() {\n  return (\n    <View style={styles.container}>\n      <Text style={styles.title}>Hello, React Native!</Text>\n      <Text style={styles.subtitle}>\n        This is a <Text style={styles.highlight}>nested</Text> text example.\n      </Text>\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: "center",\n    alignItems: "center",\n    padding: 16,\n  },\n  title: {\n    fontSize: 24,\n    fontWeight: "bold",\n    marginBottom: 16,\n  },\n  subtitle: {\n    fontSize: 16,\n    textAlign: "center",\n  },\n  highlight: {\n    fontWeight: "bold",\n    color: "blue",\n  },\n});',
        },
      },
      {
        title: 'Image Component',
        content: 'The Image component is used to display images from various sources, including local assets, network images, and base64 encoded data.',
        codeExample: {
          language: 'jsx',
          code: 'import React from "react";\nimport { Image, StyleSheet, View } from "react-native";\n\nexport default function ImageExample() {\n  return (\n    <View style={styles.container}>\n      {/* Local image */}\n      <Image\n        source={require("../assets/logo.png")}\n        style={styles.localImage}\n      />\n      \n      {/* Network image */}\n      <Image\n        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}\n        style={styles.networkImage}\n      />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    justifyContent: "center",\n    alignItems: "center",\n  },\n  localImage: {\n    width: 200,\n    height: 100,\n    resizeMode: "contain",\n    marginBottom: 20,\n  },\n  networkImage: {\n    width: 100,\n    height: 100,\n  },\n});',
        },
      },
      {
        title: 'ScrollView and FlatList',
        content: 'ScrollView and FlatList are used to display scrollable content. ScrollView renders all its child components at once, while FlatList renders items lazily, which is better for performance with long lists.',
        codeExample: {
          language: 'jsx',
          code: 'import React from "react";\nimport { FlatList, StyleSheet, Text, View } from "react-native";\n\nexport default function ListExample() {\n  const data = [\n    { id: "1", title: "Item 1" },\n    { id: "2", title: "Item 2" },\n    { id: "3", title: "Item 3" },\n    // ... more items\n  ];\n\n  const renderItem = ({ item }) => (\n    <View style={styles.item}>\n      <Text style={styles.itemText}>{item.title}</Text>\n    </View>\n  );\n\n  return (\n    <View style={styles.container}>\n      <FlatList\n        data={data}\n        renderItem={renderItem}\n        keyExtractor={(item) => item.id}\n      />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    padding: 16,\n  },\n  item: {\n    backgroundColor: "#f9f9f9",\n    padding: 20,\n    marginVertical: 8,\n    borderRadius: 10,\n  },\n  itemText: {\n    fontSize: 16,\n  },\n});',
        },
      },
    ],
  },
  // Add more module content as needed
};

export const getModuleContent = (id: string): ModuleContent | undefined => {
  return moduleContents[id];
};