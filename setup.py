from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in hondanont/__init__.py
from hondanont import __version__ as version

setup(
	name="hondanont",
	version=version,
	description="Honda Application",
	author="Mark",
	author_email="mark@mail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
