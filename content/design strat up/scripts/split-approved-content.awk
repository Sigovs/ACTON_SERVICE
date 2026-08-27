BEGIN {
  page = 0
  files[1] = "docs/content/01-tires-wheels.md"
  files[2] = "docs/content/02-maintenance.md"
  files[3] = "docs/content/03-european-repair.md"
  files[4] = "docs/content/04-electrical-systems.md"
  files[5] = "docs/content/05-auto-body.md"
  files[6] = "docs/content/06-transmission.md"
}

/NEW PAGE/ {
  page++
  next
}

page < 1 || page > 6 { next }
/^#+$/ { next }
/^#$/ { next }

{
  gsub(/\f/, "")
  print $0 > files[page]
}

