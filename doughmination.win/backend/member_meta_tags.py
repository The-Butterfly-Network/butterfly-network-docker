"""
Dynamic HTML generation for member pages with Open Graph meta tags.
This module generates HTML with proper meta tags for social media embeds.
"""

from typing import Optional, Dict, Any
from html import escape


def generate_member_html(
    member_data: Dict[str, Any],
    base_url: str = "https://www.doughmination.win"
) -> str:
    """
    Generate HTML with Open Graph meta tags for a member page.
    
    Args:
        member_data: Dictionary containing member information
        base_url: Base URL of the website
        
    Returns:
        HTML string with proper meta tags
    """
    # Extract member information
    name = member_data.get('name', '')
    display_name = member_data.get('display_name', name)
    pronouns = member_data.get('pronouns', '')
    description = member_data.get('description', '')
    avatar_url = member_data.get('avatar_url', f'{base_url}/cdn/pfp/fallback_avatar.png')
    
    # Escape HTML entities
    display_name = escape(display_name)
    pronouns = escape(pronouns) if pronouns else ''
    description = escape(description) if description else ''
    
    # Build the description with pronouns
    og_description = ""
    if pronouns:
        og_description = f"{pronouns}"
    if description:
        if og_description:
            og_description += f" | {description}"
        else:
            og_description = description
    
    # Fallback description if none provided
    if not og_description:
        og_description = "Member of the Doughmination System"
    
    # Ensure avatar URL is absolute
    if avatar_url and not avatar_url.startswith('http'):
        avatar_url = f"{base_url}{avatar_url}"
    
    # Member page URL
    member_url = f"{base_url}/{name}"
    
    # Generate HTML
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>{display_name} | Doughmination System</title>
    <meta name="title" content="{display_name} | Doughmination System">
    <meta name="description" content="{og_description}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="profile">
    <meta property="og:url" content="{member_url}">
    <meta property="og:site_name" content="Doughmination System">
    <meta property="og:title" content="{display_name}">
    <meta property="og:description" content="{og_description}">
    <meta property="og:image" content="{avatar_url}">
    <meta property="og:image:alt" content="{display_name}'s avatar">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary">
    <meta property="twitter:url" content="{member_url}">
    <meta property="twitter:title" content="{display_name}">
    <meta property="twitter:description" content="{og_description}">
    <meta property="twitter:image" content="{avatar_url}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/vite.svg">
    
    <!-- Redirect to React app -->
    <script type="module" crossorigin src="/assets/index.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index.css">
</head>
<body>
    <div id="root"></div>
</body>
</html>"""
    
    return html


def generate_index_html(base_url: str = "https://www.doughmination.win") -> str:
    """
    Generate default index.html with system-wide meta tags.
    
    Args:
        base_url: Base URL of the website
        
    Returns:
        HTML string with system meta tags
    """
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Primary Meta Tags -->
    <title>Doughmination System</title>
    <meta name="title" content="Doughmination System">
    <meta name="description" content="A plural system tracker - view our members, who's fronting, and more.">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{base_url}">
    <meta property="og:site_name" content="Doughmination System">
    <meta property="og:title" content="Doughmination System">
    <meta property="og:description" content="A plural system tracker - view our members, who's fronting, and more.">
    <meta property="og:image" content="{base_url}/cdn/pfp/fallback_avatar.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary">
    <meta property="twitter:url" content="{base_url}">
    <meta property="twitter:title" content="Doughmination System">
    <meta property="twitter:description" content="A plural system tracker - view our members, who's fronting, and more.">
    <meta property="twitter:image" content="{base_url}/cdn/pfp/fallback_avatar.png">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/vite.svg">
    
    <!-- React app assets -->
    <script type="module" crossorigin src="/assets/index.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index.css">
</head>
<body>
    <div id="root"></div>
</body>
</html>"""
    
    return html