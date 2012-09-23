{exec} = require 'child_process'

task 'watch', 'watch and compile coffeescript files', () ->
  console.log "Watching your .coffee files..."
  exec "coffee --compile --watch --output ./ src/ test/", (err, stdout, stderr) ->
    throw err if err
    console.log stdout + stderr
  
