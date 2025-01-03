
# Theme Overview

## General Information
This WordPress theme is designed with flexibility and modularity in mind, incorporating best practices in WordPress development. Below is a comprehensive breakdown of the theme's structure and functionality.

---

## Theme Structure

### Root Files
- **404.php**: Handles 404 error pages.
- **footer.php**: Contains the footer layout and logic.
- **functions.php**: Registers theme features, enqueues scripts/styles, and initializes custom functionality.
- **header.php**: Contains the header layout and logic.
- **index.php**: Default template file for displaying content.
- **style.css**: Includes theme metadata and base styles.
- **screenshot.png**: Displays the theme preview image in the WordPress admin.
- **readme.txt**: Basic information about the theme.

### Key Folders
- **assets**: Contains static assets like images, JavaScript, and CSS.
- **inc**: Core folder for modular theme functionality.
- **languages**: Holds translation files for localization.
- **resources**: Contains frontend resources such as images, JavaScript, and SASS.
- **template-parts**: Stores reusable template components.
- **template-structures**: Contains larger reusable structural components.
- **templates**: Includes specific page templates.

---

## Detailed Folder Breakdown

### `inc`
A modular approach to managing theme functionality.
- **ajax**: Functions for AJAX requests.
- **blocks**: Reusable blocks or modules.
- **css.php**: Handles inline CSS generation and output.
- **helpers.php**: Utility functions for common tasks.
- **js.php**: Handles inline JavaScript generation and output.
- **classes**: Core logic, widgets, and integrations:
  - **Cores**: Core classes and helpers:
    - Abstract classes, CSS helpers, navigation walkers, and traits.
  - **Plugins**: Integration with popular plugins like ACF, WooCommerce, and Polylang.
  - **Themes**: Theme-specific logic, customizer settings, and shortcodes.
  - **Widgets**: Custom widgets like recent posts, repeaters, and search.

### `resources`
Frontend assets used to enhance the theme.
- **img**: Images used across the theme.
- **js**: JavaScript files for frontend functionality.
  - Includes admin, login, and component scripts.
- **sass**: Modular SASS/SCSS files for styling:
  - **Components**: Styling for individual components.
  - **Mixins/Functions**: Reusable SASS logic.
  - **Variables**: Theme-wide styling variables.

---

## Recommended Development Practices

1. **Code Organization**: 
   - Maintain modularity in the `inc` folder by grouping related functionality.
   - Use clear and consistent naming conventions for files and functions.

2. **Frontend Optimization**:
   - Use tools like Vite or Webpack to compile and optimize SASS and JavaScript files.
   - Minify CSS and JS to improve performance.

3. **Plugin Compatibility**:
   - Ensure integrations (e.g., ACF, WooCommerce) are updated and compatible with the latest plugin versions.

4. **Localization**:
   - Add translation files in the `languages` folder for multi-language support.

---

## Getting Started

1. **Install the Theme**:
   - Upload the theme folder to `/wp-content/themes/` or install via WordPress admin.

2. **Activate Required Plugins**:
   - Use the TGM Plugin Activation to install and activate required plugins.

3. **Customize**:
   - Use the WordPress Customizer (`Customizer.php`) to configure the theme.

---

## Additional Notes
- Ensure the server meets WordPress requirements for the theme to function optimally.
- Refer to the `functions.php` file for initializing and extending the theme's features.

---

**Author**: Gaudev  
**License**: GPLv2 or later  
