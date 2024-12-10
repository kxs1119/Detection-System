# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.25

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /usr/bin/cmake

# The command to remove a file.
RM = /usr/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/raspberrypi/DeerProject

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/raspberrypi/DeerProject

# Include any dependencies generated for this target.
include lib/pigpio-master/CMakeFiles/pigpiod.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include lib/pigpio-master/CMakeFiles/pigpiod.dir/compiler_depend.make

# Include the progress variables for this target.
include lib/pigpio-master/CMakeFiles/pigpiod.dir/progress.make

# Include the compile flags for this target's objects.
include lib/pigpio-master/CMakeFiles/pigpiod.dir/flags.make

lib/pigpio-master/CMakeFiles/pigpiod.dir/pigpiod.c.o: lib/pigpio-master/CMakeFiles/pigpiod.dir/flags.make
lib/pigpio-master/CMakeFiles/pigpiod.dir/pigpiod.c.o: lib/pigpio-master/pigpiod.c
lib/pigpio-master/CMakeFiles/pigpiod.dir/pigpiod.c.o: lib/pigpio-master/CMakeFiles/pigpiod.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/home/raspberrypi/DeerProject/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building C object lib/pigpio-master/CMakeFiles/pigpiod.dir/pigpiod.c.o"
	cd /home/raspberrypi/DeerProject/lib/pigpio-master && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -MD -MT lib/pigpio-master/CMakeFiles/pigpiod.dir/pigpiod.c.o -MF CMakeFiles/pigpiod.dir/pigpiod.c.o.d -o CMakeFiles/pigpiod.dir/pigpiod.c.o -c /home/raspberrypi/DeerProject/lib/pigpio-master/pigpiod.c

lib/pigpio-master/CMakeFiles/pigpiod.dir/pigpiod.c.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing C source to CMakeFiles/pigpiod.dir/pigpiod.c.i"
	cd /home/raspberrypi/DeerProject/lib/pigpio-master && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -E /home/raspberrypi/DeerProject/lib/pigpio-master/pigpiod.c > CMakeFiles/pigpiod.dir/pigpiod.c.i

lib/pigpio-master/CMakeFiles/pigpiod.dir/pigpiod.c.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling C source to assembly CMakeFiles/pigpiod.dir/pigpiod.c.s"
	cd /home/raspberrypi/DeerProject/lib/pigpio-master && /usr/bin/cc $(C_DEFINES) $(C_INCLUDES) $(C_FLAGS) -S /home/raspberrypi/DeerProject/lib/pigpio-master/pigpiod.c -o CMakeFiles/pigpiod.dir/pigpiod.c.s

# Object files for target pigpiod
pigpiod_OBJECTS = \
"CMakeFiles/pigpiod.dir/pigpiod.c.o"

# External object files for target pigpiod
pigpiod_EXTERNAL_OBJECTS =

lib/pigpio-master/pigpiod: lib/pigpio-master/CMakeFiles/pigpiod.dir/pigpiod.c.o
lib/pigpio-master/pigpiod: lib/pigpio-master/CMakeFiles/pigpiod.dir/build.make
lib/pigpio-master/pigpiod: lib/pigpio-master/libpigpio.so
lib/pigpio-master/pigpiod: /usr/lib/aarch64-linux-gnu/librt.a
lib/pigpio-master/pigpiod: lib/pigpio-master/CMakeFiles/pigpiod.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/home/raspberrypi/DeerProject/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking C executable pigpiod"
	cd /home/raspberrypi/DeerProject/lib/pigpio-master && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/pigpiod.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
lib/pigpio-master/CMakeFiles/pigpiod.dir/build: lib/pigpio-master/pigpiod
.PHONY : lib/pigpio-master/CMakeFiles/pigpiod.dir/build

lib/pigpio-master/CMakeFiles/pigpiod.dir/clean:
	cd /home/raspberrypi/DeerProject/lib/pigpio-master && $(CMAKE_COMMAND) -P CMakeFiles/pigpiod.dir/cmake_clean.cmake
.PHONY : lib/pigpio-master/CMakeFiles/pigpiod.dir/clean

lib/pigpio-master/CMakeFiles/pigpiod.dir/depend:
	cd /home/raspberrypi/DeerProject && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/raspberrypi/DeerProject /home/raspberrypi/DeerProject/lib/pigpio-master /home/raspberrypi/DeerProject /home/raspberrypi/DeerProject/lib/pigpio-master /home/raspberrypi/DeerProject/lib/pigpio-master/CMakeFiles/pigpiod.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : lib/pigpio-master/CMakeFiles/pigpiod.dir/depend

