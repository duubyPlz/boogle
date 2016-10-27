#!/usr/bin/env python3

# TODO: shell script instead
# `cat hb5.txt | egrep toSearch | egrep --color toSearch2` ??

import sys
import re

toSearch1 = ""
logic = ""
toSearch2 = ""

print("search 1:")
for line in sys.stdin:
    # sanitise
    toSearchRaw = line
    toSearch = toSearchRaw.strip()
    break
print (" > first string: \"" + toSearch + "\"\n")

print ("logic [and|or|xor]: ")
for lineRaw in sys.stdin:
    line = lineRaw.strip()
    if (line == "and") or (line == "or") or (line == "xor"):
        logic = line
        print (" > logic: \"" + logic + "\"\n")
        break
    else:
        print ("logic (only \"and\", \"or\" or \"xor\"): ")

print ("search 2:")
for line in sys.stdin:
    # sanitise
    toSearch2Raw = line
    toSearch2 = toSearch2Raw.strip()
    break

print (" > second string: \"" + toSearch + "\"\n")

print ("Searching...")
print ("    first string: \"" + toSearch + "\"")
print ("    logic: \"" + logic + "\"")
print ("    second string: \"" + toSearch + "\"\n")

# search
hb5 = open('hb5.txt', 'r')

for line in hb5.readlines():
    split = line.split("|")

    if logic == "xor":
        if re.match(".*" + toSearch + ".*" + toSearch2 + ".*", line):
           continue
        elif re.match(".*" + toSearch2 + ".*" + toSearch + ".*", line):
           continue
        elif re.match(".*" + toSearch + ".*", line):
            if (len(split) == 1):
                print(line)
            else:
                name = split[0]
                value = split[1]
                print(name + " " + value)
        elif re.match(".*" + toSearch2 + ".*", line):
            if (len(split) == 1):
                print(line)
            else:
                name = split[0]
                value = split[1]
                print(name + " " + value)

    elif logic == "or":
        if re.match(".*" + toSearch + ".*" + toSearch2 + ".*", line):
            if (len(split) == 1):
                print(line)
            else:
                name = split[0]
                value = split[1]
                print(name + " " + value)
        elif re.match(".*" + toSearch2 + ".*" + toSearch + ".*", line):
            if (len(split) == 1):
                print(line)
            else:
                name = split[0]
                value = split[1]
                print(name + " " + value)
        elif re.match(".*" + toSearch + ".*", line):
            if (len(split) == 1):
                print(line)
            else:
                name = split[0]
                value = split[1]
                print(name + " " + value)
        elif re.match(".*" + toSearch2 + ".*", line):
            if (len(split) == 1):
                print(line)
            else:
                name = split[0]
                value = split[1]
                print(name + " " + value)

    elif logic == "and":
        if re.match(".*" + toSearch + ".*" + toSearch2 + ".*", line):
            if (len(split) == 1):
                print(line)
            else:
                name = split[0]
                value = split[1]
                print(name + " " + value)
        elif re.match(".*" + toSearch2 + ".*" + toSearch + ".*", line):
            
            if (len(split) == 1):
                print(line)
            else:
                name = split[0]
                value = split[1]
                print(name + " " + value)



