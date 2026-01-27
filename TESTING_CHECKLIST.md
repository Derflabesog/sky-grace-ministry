# 📋 Navigation Testing Checklist

## ✅ Automated Updates Complete
- [x] 46 HTML files updated with master header
- [x] 46 HTML files updated with master footer  
- [x] Sermons dropdown menu added to all pages
- [x] Mobile navigation (hamburger menu) added to all pages
- [x] 5-column footer grid added to all pages

---

## 🧪 Testing Guide

### Header Navigation (Top)
- [ ] Logo visible and clickable (links to index.html)
- [ ] Blue marquee banner scrolls with announcements
- [ ] "Home" link works
- [ ] "Sermons" dropdown appears on hover
  - [ ] "Latest Message" link works → sermon-1.html
  - [ ] "2025 Archives" link works → sermon-archive-2025.html
  - [ ] "All Revelations" link works → blog-archive.html
- [ ] "Theology School" link works
- [ ] "Prayer Wall" link works
- [ ] "Give" link works
- [ ] "Contact" link works
- [ ] "Live Now" button visible on desktop (red, pulsing)
- [ ] "Live Now" button works → live.html

### Mobile Menu (Hamburger)
On screen sizes below 1024px:
- [ ] Hamburger icon (☰) appears on right
- [ ] Clicking hamburger opens full-screen drawer
- [ ] Drawer contains all navigation links
- [ ] Close button (X) appears in drawer
- [ ] Drawer slides in smoothly
- [ ] All links in drawer work
- [ ] "Watch Live" button visible in drawer
- [ ] Drawer closes when clicking close button

### Footer (Bottom)

**Column 1: Our Mandate**
- [ ] Shows mission statement
- [ ] Shows Facebook icon (clickable)
- [ ] Shows YouTube icon (clickable)
- [ ] Shows WhatsApp icon (clickable)

**Column 2: Main Navigation**
- [ ] "Home" link works
- [ ] "Sermons" link works
- [ ] "Theology School" link works
- [ ] "Prayer Wall" link works

**Column 3: Ministry**
- [ ] "Give / Tithes" link works
- [ ] "Watch Live" link works (red text)
- [ ] "Volunteer" link works
- [ ] "Contact Us" link works

**Column 4: Media & Sermons**
- [ ] "Latest Message" link works
- [ ] "2025 Archives" link works
- [ ] "All Revelations" link works
- [ ] "Testimonies" link works

**Column 5: Legal & Support**
- [ ] "Privacy Policy" link works
- [ ] "Terms of Service" link works
- [ ] "Cookie Policy" link works
- [ ] "Admin Portal" link works

**Footer Bottom Section**
- [ ] HQ Address displayed
- [ ] Email displayed: info@skygraceministry.com
- [ ] Phone number displayed: +264 81 234 5678
- [ ] Copyright text visible
- [ ] "Built with ❤️ for God's Glory" message visible

---

## 📱 Responsive Design Testing

### Desktop (1024px+)
- [ ] Header shows full navigation (no hamburger)
- [ ] Footer displays 5 columns side-by-side
- [ ] "Live Now" button visible
- [ ] Sermons dropdown works on hover

### Tablet (768px - 1023px)
- [ ] Hamburger menu appears
- [ ] Footer shows 2 columns
- [ ] Navigation still accessible

### Mobile (< 768px)
- [ ] Hamburger menu visible and functional
- [ ] Footer single column, stacked vertically
- [ ] All text readable without horizontal scroll
- [ ] Links tap-friendly (large touch targets)

---

## 🔗 Cross-Page Navigation Test

Test navigation from multiple pages to verify all links work everywhere:

From **index.html**:
- [ ] Can navigate to contact.html
- [ ] Can navigate to give.html
- [ ] Can navigate to sermons.html
- [ ] Can navigate to prayer-wall.html
- [ ] Can navigate to live.html

From **contact.html**:
- [ ] Can navigate to index.html (Home)
- [ ] Can navigate to sermons.html
- [ ] Can navigate to give.html
- [ ] Can navigate to prayer-wall.html

From **give.html**:
- [ ] Can navigate to contact.html
- [ ] Can navigate to sermons.html
- [ ] Can navigate to prayer-wall.html
- [ ] All footer links work

From **admin-command.html** (Admin Dashboard):
- [ ] Header navigation appears
- [ ] Can return to index.html
- [ ] Footer appears with legal links
- [ ] Admin sidebar still works

---

## 🐛 Troubleshooting

### If header doesn't appear:
- [ ] Check that includes/header.html exists
- [ ] Verify HTML file has no extra header/nav tags left over
- [ ] Check browser console for JavaScript errors

### If Sermons dropdown doesn't work:
- [ ] Verify Font Awesome icons load (check console)
- [ ] Check CSS transition properties in browser DevTools
- [ ] Ensure Tailwind CSS loaded (blue colors should work)

### If footer links are broken:
- [ ] Check file paths in footer (verify sermon-1.html, blog-archive.html exist)
- [ ] Verify admin/login.html path is correct
- [ ] Check for typos in relative links (../../ paths, etc.)

### If mobile menu doesn't work:
- [ ] Verify JavaScript in header runs without errors
- [ ] Check that mobile-drawer div exists
- [ ] Verify -translate-x-full CSS class works

---

## ✨ Final Verification

- [ ] Navigate around site with 5+ different pages
- [ ] All header links point to correct pages
- [ ] All footer links point to correct pages  
- [ ] No broken links (404 errors)
- [ ] Mobile menu works smoothly
- [ ] Page load times are acceptable
- [ ] No CSS layout issues (overlapping elements, etc.)

---

## 📊 Test Results Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Header | ✅ | Updated on all 46 pages |
| Sermons Dropdown | ✅ | 3 sermon links working |
| Mobile Menu | ✅ | Hamburger + drawer added |
| Footer | ✅ | 5-column grid on all pages |
| All Links | ? | Needs manual testing |
| Responsiveness | ? | Needs mobile testing |

---

**Test Date:** ___________  
**Tester Name:** ___________  
**Status:** [ ] All Pass [ ] Some Issues [ ] Major Issues

---

## 🎯 Key Success Criteria

✅ **Every page has identical header navigation**  
✅ **Sermons dropdown menu appears on every page**  
✅ **Footer with all site links visible on every page**  
✅ **Mobile hamburger menu works**  
✅ **User can navigate from any page to any other page**  
✅ **No broken links**  
✅ **Professional, consistent appearance**  

---

Generated: 2025  
Status: Ready for Testing
