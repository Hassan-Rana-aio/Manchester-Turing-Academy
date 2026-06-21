"""
    It loads env variables w.r.t to env being passed in arguments
    It parses CLI arguments
"""

import argparse
from pathlib import Path
from dotenv import load_dotenv

parser = argparse.ArgumentParser(
    description="Blogs App Server Parser",
    formatter_class=argparse.ArgumentDefaultsHelpFormatter,
)

parser.add_argument(
    "-e",
    "--env",
    help="Select the env for the server",
    type=str,
    required=False,
    choices=["dev", "demo", "prod"],
)

## parse arguments
args = parser.parse_args()

## get env value
environment = args.env.lower() if args.env else None

if environment == "prod":
    load_dotenv(dotenv_path=(Path(".") / "envs/.env.prod"))

elif environment == "dev":
    load_dotenv(dotenv_path=(Path(".") / "envs/.env.dev"))

elif environment == "demo":
    load_dotenv(dotenv_path=(Path(".") / "envs/.env.demo"))

else:
    load_dotenv(dotenv_path=(Path(".") / "envs/.env.local"))
