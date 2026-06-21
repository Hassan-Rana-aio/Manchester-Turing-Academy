#!/bin/bash

sleep 15s && alembic upgrade head && python main.py
