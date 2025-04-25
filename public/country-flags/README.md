# Country Flags

This folder contains flag images for different countries where JCB equipment is deployed.

## Usage

1. Place country flag images in this folder
2. Use a consistent naming convention (e.g., `country-code.png` or `country-name.png`)
3. Reference these images in your MongoDB data or sample data using the path:
   ```
   /images/country-flags/country-name.png
   ```

## Image Requirements

- Recommended format: PNG with transparent background
- Recommended size: 300x200 pixels or similar aspect ratio
- Keep file sizes small (under 100KB if possible) for better performance
- Consider using standard country codes (ISO 3166-1) for file names

## Example

```javascript
{
  customer: "RIHAM GENERAL",
  countryFlag: "/images/country-flags/uae.png",
  // other equipment data...
}
```
