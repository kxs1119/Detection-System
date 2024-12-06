#----------------------------------------------------------------
# Generated CMake target import file for configuration "Debug".
#----------------------------------------------------------------

# Commands may need to know the format version.
set(CMAKE_IMPORT_FILE_VERSION 1)

# Import target "pigpio::pigpio" for configuration "Debug"
set_property(TARGET pigpio::pigpio APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(pigpio::pigpio PROPERTIES
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/lib/libpigpio.so"
  IMPORTED_SONAME_DEBUG "libpigpio.so"
  )

list(APPEND _cmake_import_check_targets pigpio::pigpio )
list(APPEND _cmake_import_check_files_for_pigpio::pigpio "${_IMPORT_PREFIX}/lib/libpigpio.so" )

# Import target "pigpio::pigpiod_if" for configuration "Debug"
set_property(TARGET pigpio::pigpiod_if APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(pigpio::pigpiod_if PROPERTIES
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/lib/libpigpiod_if.so"
  IMPORTED_SONAME_DEBUG "libpigpiod_if.so"
  )

list(APPEND _cmake_import_check_targets pigpio::pigpiod_if )
list(APPEND _cmake_import_check_files_for_pigpio::pigpiod_if "${_IMPORT_PREFIX}/lib/libpigpiod_if.so" )

# Import target "pigpio::pigpiod_if2" for configuration "Debug"
set_property(TARGET pigpio::pigpiod_if2 APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(pigpio::pigpiod_if2 PROPERTIES
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/lib/libpigpiod_if2.so"
  IMPORTED_SONAME_DEBUG "libpigpiod_if2.so"
  )

list(APPEND _cmake_import_check_targets pigpio::pigpiod_if2 )
list(APPEND _cmake_import_check_files_for_pigpio::pigpiod_if2 "${_IMPORT_PREFIX}/lib/libpigpiod_if2.so" )

# Import target "pigpio::pig2vcd" for configuration "Debug"
set_property(TARGET pigpio::pig2vcd APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(pigpio::pig2vcd PROPERTIES
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/bin/pig2vcd"
  )

list(APPEND _cmake_import_check_targets pigpio::pig2vcd )
list(APPEND _cmake_import_check_files_for_pigpio::pig2vcd "${_IMPORT_PREFIX}/bin/pig2vcd" )

# Import target "pigpio::pigpiod" for configuration "Debug"
set_property(TARGET pigpio::pigpiod APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(pigpio::pigpiod PROPERTIES
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/bin/pigpiod"
  )

list(APPEND _cmake_import_check_targets pigpio::pigpiod )
list(APPEND _cmake_import_check_files_for_pigpio::pigpiod "${_IMPORT_PREFIX}/bin/pigpiod" )

# Import target "pigpio::pigs" for configuration "Debug"
set_property(TARGET pigpio::pigs APPEND PROPERTY IMPORTED_CONFIGURATIONS DEBUG)
set_target_properties(pigpio::pigs PROPERTIES
  IMPORTED_LOCATION_DEBUG "${_IMPORT_PREFIX}/bin/pigs"
  )

list(APPEND _cmake_import_check_targets pigpio::pigs )
list(APPEND _cmake_import_check_files_for_pigpio::pigs "${_IMPORT_PREFIX}/bin/pigs" )

# Commands beyond this point should not need to know the version.
set(CMAKE_IMPORT_FILE_VERSION)
