cmake_minimum_required(VERSION 3.29)
project(DeerProject C)

set(CMAKE_C_STANDARD 11)

add_subdirectory(lib/pigpio-master)

add_executable(DeerProject src/init.c
        src/read_sensors.c
        include/read_sensors.h)

target_link_libraries(DeerProject pigpio)