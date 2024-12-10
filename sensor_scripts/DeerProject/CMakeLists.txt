cmake_minimum_required(VERSION 3.25)
project(DeerProject C)

set(CMAKE_C_STANDARD 11)

add_subdirectory(lib/pigpio-master)

add_executable(DeerProject src/init.c
        src/read_sensors.c
	src/pulse.c
	src/gps.c
        include/read_sensors.h
	include/pulse.h
	include/gps.h)

target_include_directories(DeerProject PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include)

target_link_libraries(DeerProject pigpio)
